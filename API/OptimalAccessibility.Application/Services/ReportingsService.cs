using System.Reflection;
using HandlebarsDotNet;
using PuppeteerSharp;
using PuppeteerSharp.Media;

using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;


namespace OptimalAccessibility.API.Services
{
    public class ReportingsService : IReporting
    {
        public async Task<Stream> CompileReportPdf(string document)
        {
            //await new BrowserFetcher().DownloadAsync(BrowserFetcher.DefaultRevision);
            var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });
            var page = await browser.NewPageAsync();
            await page.SetContentAsync(document);
            await page.EmulateMediaTypeAsync(MediaType.Screen);
            var pdf = await page.PdfStreamAsync();
            await browser.CloseAsync();

            return pdf;
        }

        public string ComplieReportTemplateWithData(OptimalAccessibilityReportDetails data)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "ReportTemplates.OptimalAccessibilityReportTemplate";

            Stream? stream;
            try
            {
                stream = assembly.GetManifestResourceStream(resourceName);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return string.Empty;
            }
            if (stream == null)
            {
                return string.Empty;
            }

            var reader = new StreamReader(stream);
            var source = reader.ReadToEnd();
            var template = Handlebars.Compile(source);
            var result = template(data);

            return result;
        }
    }
}

