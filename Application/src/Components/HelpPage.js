import "./HelpPage.css";



function HelpPage(props) {


    return (
        <div id="OuterHelpPageDIV">
            <div id="InnerHelpPageDIV">
                <h3 style={{backgroundColor: props.Color}}>{props.PageName}</h3>
                <p>{props.PageContent}</p>
            </div>
        </div>
    );
}


export default HelpPage;