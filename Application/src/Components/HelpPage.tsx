import "./HelpPage.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { PluggableList } from "react-markdown/lib/react-markdown";

const HelpPage: React.FC<{Color: string, PageName: string, PageContent: string}> = ({Color, PageName, PageContent}): JSX.Element => {
  return (
    <div id="OuterHelpPageDIV">
      <div id="InnerHelpPageDIV">
        <h3 style={{ backgroundColor: Color }}>{PageName}</h3>
        <div>
          <ReactMarkdown rehypePlugins={rehypeRaw as unknown as PluggableList} remarkPlugins={remarkGfm as unknown as PluggableList}>
            {PageContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
