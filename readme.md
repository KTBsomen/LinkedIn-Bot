
# LinkedIn API Interaction Server

This repository hosts an Express.js server designed to interact with LinkedIn's API. It provides endpoints for fetching LinkedIn profiles, sending messages, and retrieving connections. The server uses custom headers and cookies for authentication, making it a robust solution for LinkedIn automation and data extraction.

## Features

- **Fetch LinkedIn Profiles**: Retrieve detailed information of any LinkedIn profile by ID.
- **Send Messages**: Send personalized messages to LinkedIn users.
- **Get Connections**: Access a user's LinkedIn connections with pagination support.

## Endpoints

### Fetch LinkedIn Profile
- **URL**: `/getProfile/:id`
- **Method**: POST
- **Description**: Fetches a LinkedIn profile using the provided `id`.
- **Parameters**:
  - `id` (string, required): LinkedIn profile ID.
  - Request Body:
    - `headers` (object, optional): Custom headers.
    - `cookie` (string, optional): Cookie string.

### Send a Message
- **URL**: `/send/:receiverId`
- **Method**: POST
- **Description**: Sends a message to a LinkedIn user.
- **Parameters**:
  - `receiverId` (string, required): LinkedIn receiver profile ID.
  - Request Body:
    - `text` (string, optional): Message text.
    - `senderId` (string, optional): Sender profile ID.

### Get Connections
- **URL**: `/getConnections/:start/:count`
- **Method**: POST
- **Description**: Retrieves LinkedIn connections.
- **Parameters**:
  - `start` (number, required): Starting index.
  - `count` (number, required): Number of connections to retrieve.
  - Request Body:
    - `headers` (object, optional): Custom headers.
    - `cookie` (string, optional): Cookie string.

## Usage

### Fetching a Profile
```bash
curl -X POST "http://3.109.158.37/api/v1/getProfile/12345" \
-H "Content-Type: application/json" \
-d '{
  "headers": {
    "csrf-token": "your_csrf_token",
    "cookie": "your_cookie"
  }
}'
```

### Sending a Message
```bash
curl -X POST "http://3.109.158.37/api/v1/send/67890" \
-H "Content-Type: application/json" \
-d '{
  "text": "Hello, this is a test message.",
  "senderId": "urn:li:fsd_profile:ACoAADFPm0wBD8_2w8dpux66aLduR0lOhqN2zKk"
}'
```

### Getting Connections
```bash
curl -X POST "http://3.109.158.37/api/v1/getConnections/0/10" \
-H "Content-Type: application/json" \
-d '{
  "headers": {
    "csrf-token": "your_csrf_token",
    "cookie": "your_cookie"
  }
}'
```

## Headers Retrieval
To obtain the necessary headers for making requests:
1. Open Developer Tools (F12 or Inspect).
2. Go to the "Network" tab.
3. Perform an action on LinkedIn that interacts with the API.
4. Look for requests including "voyager" in their path.
5. Copy the required headers (`csrf-token`, `cookie`).

## Installation
Clone the repository and install dependencies:
```bash
git clone http://3.109.158.37/api/v1/
cd api-server
npm install
```

## Run the Server
Start the Express server:
```bash
node index.js
```

## Contributing
Contributions are welcome! Please fork this repository and submit pull requests.

## License
This project is licensed under the GNU GENERAL PUBLIC LICENSE.

---

With this detailed description, your GitHub repository should be more visible in search results and clearly convey its purpose and capabilities to potential users and contributors.