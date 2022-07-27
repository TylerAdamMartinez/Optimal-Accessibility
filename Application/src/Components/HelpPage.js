import "./HelpPage.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function HelpPage(props) {
  return (
    <div id="OuterHelpPageDIV">
      <div id="InnerHelpPageDIV">
        <h3 style={{ backgroundColor: props.Color }}>{props.PageName}</h3>
        <div>
          <ReactMarkdown rehypePlugins={rehypeRaw} remarkPlugins={remarkGfm}>
            {props.PageContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
