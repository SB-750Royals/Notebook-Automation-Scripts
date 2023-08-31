function myFunction() {
  // Open the active document
  var doc = DocumentApp.getActiveDocument();
  
  // Get the body of the document
  var body = doc.getBody();
  
  // Initialize a counter to track changes
  var changeCount = 0;

  // Loop through each paragraph to find "Title", "Heading 1", or "Heading 2"
  for (var i = 0; i < body.getNumChildren(); i++) {
    var child = body.getChild(i);
    if (child.getType() !== DocumentApp.ElementType.PARAGRAPH) continue;
    var paragraph = child.asParagraph();
    var heading = paragraph.getHeading();
    var text = paragraph.getText();
    var trimmedText = text.trim();

    // Remove extra spaces and center-align for specific headings
    if (heading === DocumentApp.ParagraphHeading.TITLE || 
        heading === DocumentApp.ParagraphHeading.HEADING1 ||
        heading === DocumentApp.ParagraphHeading.HEADING2) {
      if (trimmedText.length > 0 && text !== trimmedText) {
        paragraph.setText(trimmedText);
        changeCount++;
      }
      paragraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      changeCount++;
    }

    // For "Heading 2" ending with "Additional Page"
    if (heading === DocumentApp.ParagraphHeading.HEADING2 && text.endsWith("Additional Page")) {
      var nextChild = body.getChild(i + 1);
      if (nextChild && nextChild.getType() === DocumentApp.ElementType.PARAGRAPH) {
        var nextParagraph = nextChild.asParagraph();
        if (nextParagraph.getText() !== "Continued From Previous Page") {
          // Insert the new text
          var newParagraph = body.insertParagraph(i + 1, "Continued From Previous Page");

          // Set the style for the entire paragraph
          newParagraph.setFontFamily("Roboto Mono Light")
                      .setFontSize(10)
                      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
                      .setHeading(DocumentApp.ParagraphHeading.NORMAL)
                      .setItalic(true)
                      .setForegroundColor("#666666");
          
          changeCount++;
          i++;  // Increase 'i' as a new paragraph has been added
        }
      }
    }

    // Center-align any paragraph that is exactly "Continued From Previous Page"
    if (text === "Continued From Previous Page") {
      paragraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      changeCount++;
    }
  }
  
  // Log the total number of changes made
  Logger.log("Total number of changes made: " + changeCount);
}
