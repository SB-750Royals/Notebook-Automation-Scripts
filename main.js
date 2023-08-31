function myFunction() {
  // Open the active document
  var doc = DocumentApp.getActiveDocument();
  
  // Get the body of the document
  var body = doc.getBody();
  
  // Initialize a counter to track changes
  var changeCount = 0;

  // Loop through each element in the document body
  for (var i = 0; i < body.getNumChildren(); i++) {
    var child = body.getChild(i);

    // Handle paragraphs
    if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
      var paragraph = child.asParagraph();
      var heading = paragraph.getHeading();
      var text = paragraph.getText();
      var trimmedText = text.trim();

      // Remove extra spaces and center-align for specific headings
      if ([DocumentApp.ParagraphHeading.TITLE, 
           DocumentApp.ParagraphHeading.HEADING1,
           DocumentApp.ParagraphHeading.HEADING2].includes(heading)) {
        
        if (trimmedText.length > 0 && text !== trimmedText) {
          paragraph.setText(trimmedText);
          changeCount++;
        }
        paragraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
        changeCount++;
      }

      // For long paragraphs with more than 12 words
      
    }


  
  // Log the total number of changes made
  Logger.log("Total number of changes made: " + changeCount);
  }
}
