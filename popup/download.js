const hidePage = ``;

function listenForClicks() {
  document.addEventListener("click", (e) => {

    function beastify(tabs) {
      browser.tabs.saveAsPDF({}).then((status) => {
        console.log(status);
      });
    }

    function reportError(error) {
      console.error(`Could not convert: ${error}`);
    }

    if (e.target.classList.contains("download")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(beastify)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute converting content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/regenerate.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);