
document.addEventListener("DOMContentLoaded", function() {
    var contentDivs = document.querySelectorAll('#content')

    contentDivs.forEach(function(contentDiv) {
        var contentText = contentDiv.innerHTML
        
        // Configure marked options
        marked.setOptions({
            breaks: true,  // Convert line breaks to <br>
            gfm: true,     // Enable GitHub Flavored Markdown
            tables: true   // Enable tables
        })
        
        // Process the content with marked
        var updatedText = marked.parse(contentText)
        
        // Apply additional custom styling
        // Add bold class to strong elements
        updatedText = updatedText.replace(/<strong>/g, '<span class="bold">')
        updatedText = updatedText.replace(/<\/strong>/g, '</span>')
        
        // Add link class to anchor elements
        updatedText = updatedText.replace(/<a href="([^"]+)">/g, '<a class="link" href="$1">')
        
        // Add custom classes to tables
        updatedText = updatedText.replace(/<table>/g, '<table class="wiki-table">')
        updatedText = updatedText.replace(/<th>/g, '<th class="table-cell-bold">')
        updatedText = updatedText.replace(/<td>/g, '<td class="table-cell">')
        
        // For backward compatibility, also process the custom syntax
        // Process custom link text format "url|text"
        updatedText = updatedText.replace(/\"(.*?)\|(.*?)\"/g, function(match, url, text) {
            return '<a class="link" href="' + url + '">' + text + '</a>'
        })
        
        // Process custom table format ||content|| and ||~content||
        updatedText = updatedText.replace(/\|\|(~?)([^|]*?)\|\|/g, function(match, isBold, content) {
            if (isBold === '~') {
                return '<td class="table-cell-bold">' + content.trim() + '</td>'
            }
            return '<td class="table-cell">' + content.trim() + '</td>'
        })
        
        // Convert line breaks in tables to new rows
        updatedText = updatedText.replace(/(<\/td>)\s*<br>\s*/g, '$1</tr><tr>')
        
        // Wrap table content in table structure if not already wrapped
        if (updatedText.includes('<td') && !updatedText.includes('<table')) {
            updatedText = '<table class="wiki-table"><tr>' + updatedText + '</tr></table>'
        }
        
        contentDiv.innerHTML = updatedText
    })
})