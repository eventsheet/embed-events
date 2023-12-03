

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('eventsheet-embed-widget');
    const sheetID = container.getAttribute('sheet-id')
    const apiUrl = 'https://api.eventsheet.app/v1/events/public/sheet/' + sheetID;

    // Styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://eventsheet.github.io/embed-events/style.css';
    document.head.appendChild(link);
    
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
                const eventDateDetails = document.createElement('div')
                eventDateDetails.className = "date"
                eventContainer.appendChild(eventDateDetails)
                
                // Convert Seconds to date
                const milliseconds = item.times.event_start_time.seconds * 1000;
                const date = new Date(milliseconds);
                const month = date.toLocaleString('en-us', { month: 'short' })
                const day = date.getDate();
                const year = date.getFullYear();
                // Month
                const eventMonth = document.createElement('div')
                eventMonth.className = "month"
                eventMonth.textContent = month
                eventDateDetails.appendChild(eventMonth)
                // Day
                const eventDay = document.createElement('div')
                eventDay.className = "day"
                eventDay.textContent = day
                eventDateDetails.appendChild(eventDay)
                // Year
                const eventYear = document.createElement('div')
                eventYear.className = "year"
                eventYear.textContent = year
                eventDateDetails.appendChild(eventYear)

                // Event Details
                const eventGeneralDetails = document.createElement('div')
                eventGeneralDetails.classList.add("location")

                // Event Time
                const eventTimeDetails = document.createElement('div')
                eventTimeDetails.classList.add("time")
                const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
                const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: "numeric", timeZoneName: "shortGeneric" })
                eventTimeDetails.textContent = weekday + " | " + time
                eventGeneralDetails.appendChild(eventTimeDetails)

                // Event Location Details
                const eventLocationDetails = document.createElement('a')
                eventLocationDetails.href = "https://www.google.com/maps/place/?q=place_id:" + item.location.maps_place_id
                eventLocationDetails.target = '_blank';
                eventLocationDetails.classList.add("venue")
                eventLocationDetails.textContent = item.location.venue_name
                eventGeneralDetails.appendChild(eventLocationDetails)

                const eventLocationCityState = document.createElement('div')
                eventLocationCityState.classList.add("city", "state")
                eventLocationCityState.textContent = item.location.city_name + ", " + item.location.state_name
                eventGeneralDetails.appendChild(eventLocationCityState)


                eventContainer.appendChild(eventGeneralDetails)

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