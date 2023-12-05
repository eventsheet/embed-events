# Eventsheet Event Embed Widget

## Sample Embed

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo</title>
</head>
<body>
    <p>Example Eventsheet Widget</p>
    <hr>
    <div 
        id="eventsheet-embed-widget" sheet-id="5629db58-9c16-481e-a80e-db34557d2f7c">
    </div>
    <script src="https://eventsheet.github.io/embed-events/embed.js"></script>
</body>
</html>
```

## Configuration

| Parameter          | Description                                 | Accepted Values                            |
|--------------------|---------------------------------------------|--------------------------------------------|
| id                 | `div` id for injecting the widget           | Required `eventsheet-embed-widget`         |
| sheet-id           | Sheet ID of the list of events to display   | Required UUID: `5629db58-9c16-481e-a80e-db34557d2f7c` |
| embed-css          | Apply Eventsheet's default styling          | Optional Bool: `true`, `false`             |
| action-button-text | The text for each action button             | Optional String                            |

<div 
        id="eventsheet-embed-widget"
        embed-css="false"
        action-button-text="Get Tickets"
        sheet-id="5629db58-9c16-481e-a80e-db34557d2f7c">
    </div>


## Testing

Open `local.html` locally in your browser. This file uses local references to the `embed.js` file and the `style.css` file.