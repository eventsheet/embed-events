document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('eventsheet-embed-widget');
    const sheetID = container.getAttribute('sheet-id')
    const apiUrl = 'https://api.eventsheet.app/v1/events/public/sheet/' + sheetID;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const tourHeader = document.createElement('h1')
            tourHeader.textContent = data["tour_name"]
            container.appendChild(tourHeader);

            const artistHeader = this.createElement('h2')
            artistHeader.textContent = data["artist_name"]
            container.appendChild(artistHeader);

            const list = document.createElement('ul')
            data.events.forEach(item => {
                console.log(item)

                const eventContainer = document.createElement('div')
                eventContainer.className = "event"

                // Event Time Details - In user's timezone
                const eventTimeDetails = document.createElement('div')
                eventTimeDetails.className = "time"
                const milliseconds = item.times.event_start_time.seconds * 1000;
                const date = new Date(milliseconds);
                eventTimeDetails.textContent = date.toLocaleString();
                eventContainer.appendChild(eventTimeDetails)

                // Event Location Details
                const eventLocationDetails = document.createElement('div')
                eventLocationDetails.className = "location"
                eventLocationDetails.textContent = item.location.venue_name + " - " + item.location.city_name + ", " + item.location.state_name
                eventContainer.appendChild(eventLocationDetails)

                // Event Ticket Button
                var ticketLink = document.createElement('a');
                ticketLink.href = item.link;
                ticketLink.textContent = 'Buy Tickets';
                ticketLink.className = 'tickets';
                ticketLink.target = '_blank';
                eventContainer.appendChild(ticketLink);

                // Add all events to the list
                const listItem = document.createElement('li')
                listItem.appendChild(eventContainer)
                list.appendChild(listItem)
            });

            container.appendChild(list);
        }).catch(error => console.error('Error:', error));
});