use chrono::{DateTime, Local};
use image::ColorType;
use serde::{Deserialize, Serialize};
use std::{
    collections::{HashMap, HashSet},
    env,
    ffi::OsStr,
    fs,
    path::Path,
};

#[derive(Serialize, Deserialize, Debug)]
struct ImageMetaData {
    file_extenstion: String,
    time_created: String,
    time_modified: String,
    bytes: u64,
}

impl ImageMetaData {
    fn new(
        file_extenstion: String,
        time_created: String,
        time_modified: String,
        bytes: u64,
    ) -> Self {
        ImageMetaData {
            file_extenstion,
            time_created,
            time_modified,
            bytes,
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct ImageColorData<T> {
    height: u32,
    width: u32,
    color_type: String,
    unique_colors: usize,
    color_map: Vec<T>,
}

impl<T> ImageColorData<T> {
    fn new(
        height: u32,
        width: u32,
        color_type: String,
        unique_colors: usize,
        color_map: Vec<T>,
    ) -> Self {
        ImageColorData {
            height,
            width,
            color_type,
            unique_colors,
            color_map,
        }
    }
}

fn main() {
    let file = match env::args().nth(1) {
        Some(file) => file,
        None => panic!("failed to supply an image"),
    };

    let serialized_file_metadata = get_image_metadata(&file).unwrap();
    println!("{}", serialized_file_metadata);
    let serialized_file_color_data = get_image_colors(&file).unwrap();
    println!("{}", serialized_file_color_data);
}

fn get_image_metadata(file: &str) -> Result<String, Box<dyn std::error::Error>> {
    let metadata = fs::metadata(file)?;
    let file_extenstion = Path::new(file)
        .extension()
        .and_then(OsStr::to_str)
        .unwrap_or("no file extension")
        .to_string();

    let created = metadata.created()?;
    let time_created: DateTime<Local> = created.into();
    let time_created = time_created.format("%A %B %d, %Y %H:%M").to_string();

    let modified = metadata.modified()?;
    let time_modified: DateTime<Local> = modified.into();
    let time_modified = time_modified.format("%A %B %d, %Y %H:%M").to_string();

    let bytes: u64 = metadata.len();

    let image_metadata = ImageMetaData::new(file_extenstion, time_created, time_modified, bytes);
    Ok(match serde_json::to_string(&image_metadata) {
        Ok(json_string) => json_string,
        Err(err) => return Err(Box::new(err)),
    })
}

fn to_string(color_type: &ColorType) -> String {
    match color_type {
        ColorType::L8 => return "8-bit luminance".to_owned(),
        ColorType::La8 => return "8-bit luminance with an alpha channel".to_owned(),
        ColorType::Rgb8 => return "8-bit RGB".to_owned(),
        ColorType::Rgba8 => return "8-bit RGB with an alpha channel".to_owned(),
        ColorType::L16 => return "16-bit luminance".to_owned(),
        ColorType::La16 => return "16-bit luminance with an alpha channel".to_owned(),
        ColorType::Rgb16 => return "16-bit RGB".to_owned(),
        ColorType::Rgba16 => return "16-bit RGB with an alpha channel".to_owned(),
        ColorType::Rgb32F => return "32-bit floating point values RGB".to_owned(),
        ColorType::Rgba32F => {
            return "32-bit floating point values RGB with an alpha channel".to_owned()
        }
        &_ => return "".to_owned(),
    }
}

fn get_image_colors(image_path: &str) -> Result<String, Box<dyn std::error::Error>> {
    let image_from_path = match image::open(&Path::new(image_path)) {
        Ok(img) => img,
        Err(err) => return Err(Box::new(err)),
    };

    let color_type = image_from_path.color();
    let image_from_path_width = image_from_path.width();
    let image_from_path_height = image_from_path.height();

    match color_type {
        ColorType::Rgb8 => {
            let rgb_image = image_from_path;
            let mut rgb_image_unique_values = HashSet::<[u8; 3]>::new();
            let mut rgb_image_dictionary = HashMap::<[u8; 3], usize>::new();

            for rgb in rgb_image.to_rgb8().pixels() {
                let rgb_array = [rgb[0], rgb[1], rgb[2]];

                if rgb_image_unique_values.contains(&rgb_array) {
                    if let Some(current_count) = rgb_image_dictionary.get_mut(&rgb_array) {
                        *current_count = *current_count + 1;
                    }
                } else {
                    rgb_image_unique_values.insert(rgb_array);
                    rgb_image_dictionary.insert(rgb_array, 0);
                }
            }

            let mut count_vec: Vec<(&[u8; 3], &usize)> = rgb_image_dictionary.iter().collect();
            count_vec.sort_by(|a, b| b.1.cmp(a.1));

            let image_color_data = ImageColorData::new(
                image_from_path_width,
                image_from_path_height,
                to_string(&color_type),
                rgb_image_dictionary.len(),
                count_vec,
            );

            return Ok(match serde_json::to_string(&image_color_data) {
                Ok(json_string) => json_string,
                Err(err) => return Err(Box::new(err)),
            });
        }
        ColorType::Rgba8 => {
            let rgba_image = image_from_path;
            let mut rgba_image_unique_values = HashSet::<[u8; 4]>::new();
            let mut rgba_image_dictionary = HashMap::<[u8; 4], usize>::new();

            for rgba in rgba_image.to_rgba8().pixels() {
                let rgba_array = [rgba[0], rgba[1], rgba[2], rgba[3]];

                if rgba_image_unique_values.contains(&rgba_array) {
                    if let Some(current_count) = rgba_image_dictionary.get_mut(&rgba_array) {
                        *current_count = *current_count + 1;
                    }
                } else {
                    rgba_image_unique_values.insert(rgba_array);
                    rgba_image_dictionary.insert(rgba_array, 0);
                }
            }

            let mut count_vec: Vec<(&[u8; 4], &usize)> = rgba_image_dictionary.iter().collect();
            count_vec.sort_by(|a, b| b.1.cmp(a.1));

            let image_color_data = ImageColorData::new(
                image_from_path_width,
                image_from_path_height,
                to_string(&color_type),
                rgba_image_dictionary.len(),
                count_vec,
            );

            return Ok(match serde_json::to_string(&image_color_data) {
                Ok(json_string) => json_string,
                Err(err) => return Err(Box::new(err)),
            });
        }
        _ => {
            todo!()
        }
    }
}
