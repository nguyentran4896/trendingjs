export default () => {
    var head = document.getElementsByTagName("head")[0],
        mIconsLink = document.createElement("link")

    mIconsLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    mIconsLink.id = "dynamic-css";
    mIconsLink.media = "screen";
    mIconsLink.type = "text/css";
    mIconsLink.rel = "stylesheet";

    head.appendChild(mIconsLink);
}

