document.addEventListener("DOMContentLoaded", function() {
    var contentDivs = document.querySelectorAll('#content');

    contentDivs.forEach(function(contentDiv) {
        var contentText = contentDiv.innerHTML;

        // Process bold text
        var updatedText = contentText.replace(/\*\*(.*?)\*\*/g, '<span class="bold">$1</span>');

        // Process link text
        updatedText = updatedText.replace(/\"(.*?)\|(.*?)\"/g, function(match, url, text) {
            return '<a class="link" href="' + url + '">' + text + '</a>';
        });

        // Process tables - improved pattern matching
        updatedText = updatedText.replace(/\|\|(~?)([^|]*?)\|\|/g, function(match, isBold, content) {
            if (isBold === '~') {
                return '<td class="table-cell-bold">' + content.trim() + '</td>';
            }
            return '<td class="table-cell">' + content.trim() + '</td>';
        });

        // Convert line breaks in tables to new rows - improved pattern
        updatedText = updatedText.replace(/(<\/td>)\s*<br>\s*/g, '$1</tr><tr>');

        // Wrap table content in table structure
        if (updatedText.includes('<td')) {
            updatedText = '<table class="wiki-table"><tr>' + updatedText + '</tr></table>';
        }

        contentDiv.innerHTML = updatedText;
    });
});
