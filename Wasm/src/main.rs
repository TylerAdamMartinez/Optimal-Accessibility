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
struct ImageColorData {
    height: u32,
    width: u32,
    color_type: String,
    unique_colors: usize,
    color_map: HashMap<u8, usize>,
}

impl ImageColorData {
    fn new(
        height: u32,
        width: u32,
        color_type: String,
        unique_colors: usize,
        color_map: HashMap<u8, usize>,
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
            let rgb_image = image_from_path.to_rgb8().into_vec();
            let rgb_image_unique_values = rgb_image.clone().into_iter().collect::<HashSet<u8>>();
            let mut rgb_image_dictionary = HashMap::<u8, usize>::new();

            for value in rgb_image_unique_values.iter() {
                rgb_image_dictionary.insert(value.to_owned(), 0);
            }

            for rgb_value in rgb_image.iter() {
                if let Some(current_count) = rgb_image_dictionary.get_mut(rgb_value) {
                    *current_count = *current_count + 1;
                }
            }

            let image_color_data = ImageColorData::new(
                image_from_path_width,
                image_from_path_height,
                to_string(&color_type),
                rgb_image_dictionary.len(),
                rgb_image_dictionary,
            );

            return Ok(match serde_json::to_string(&image_color_data) {
                Ok(json_string) => json_string,
                Err(err) => return Err(Box::new(err)),
            });
        }
        ColorType::Rgba8 => {
            let rgba_image = image_from_path.to_rgba8().into_vec();
            let rgba_image_unique_values = rgba_image.clone().into_iter().collect::<HashSet<u8>>();
            let mut rgba_image_dictionary = HashMap::<u8, usize>::new();

            for value in rgba_image_unique_values.iter() {
                rgba_image_dictionary.insert(value.to_owned(), 0);
            }

            for rgba_value in rgba_image.iter() {
                if let Some(current_count) = rgba_image_dictionary.get_mut(rgba_value) {
                    *current_count = *current_count + 1;
                }
            }

            let image_color_data = ImageColorData::new(
                image_from_path_width,
                image_from_path_height,
                to_string(&color_type),
                rgba_image_dictionary.len(),
                rgba_image_dictionary,
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
