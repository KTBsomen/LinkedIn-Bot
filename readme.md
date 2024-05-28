Sure! Here's the API documentation for your Express.js server with the base URL `http://3.109.158.37/api/v1/`.

### API Documentation

**Base URL**: `http://3.109.158.37/api/v1/`

#### Endpoints

1. **Fetch LinkedIn Profile**
   - **URL**: `/getProfile/:id`
   - **Method**: POST
   - **Description**: Fetches a LinkedIn profile using the provided `id`.
   - **Parameters**:
     - **Path Parameters**:
       - `id` (string, required): LinkedIn profile ID.
     - **Request Body**:
       - `headers` (object, optional): Custom headers for the request.
       - `cookie` (string, optional): Cookie string for the request.
   - **Example Request**:
     ```json
     {
       "headers": {
         "csrf-token": "your_csrf_token",
         "cookie": "your_cookie"
       }
     }
     ```
   - **Response**:
     - 200 OK: LinkedIn profile data.
     - 500 Internal Server Error: Error message and details.

2. **Send a Message**
   - **URL**: `/send/:receiverId`
   - **Method**: POST
   - **Description**: Sends a message to a LinkedIn user specified by the `receiverId`.
   - **Parameters**:
     - **Path Parameters**:
       - `receiverId` (string, required): LinkedIn receiver profile ID.
     - **Request Body**:
       - `text` (string, optional): Message text. Default: "Hi How are you?".
       - `senderId` (string, optional): LinkedIn sender profile ID. Default: "urn:li:fsd_profile:ACoAADFPm0wBD8_2w8dpux66aLduR0lOhqN2zKk".
   - **Example Request**:
     ```json
     {
       "text": "Hello, this is a test message.",
       "senderId": "urn:li:fsd_profile:ACoAADFPm0wBD8_2w8dpux66aLduR0lOhqN2zKk"
     }
     ```
   - **Response**:
     - 200 OK: Message sending status.
     - 500 Internal Server Error: Error message and details.

3. **Get Connections**
   - **URL**: `/getConnections/:start/:count`
   - **Method**: POST
   - **Description**: Retrieves a list of LinkedIn connections starting from the `start` parameter and limited by the `count` parameter.
   - **Parameters**:
     - **Path Parameters**:
       - `start` (number, required): The starting index of connections.
       - `count` (number, required): The number of connections to retrieve.
     - **Request Body**:
       - `headers` (object, optional): Custom headers for the request.
       - `cookie` (string, optional): Cookie string for the request.
   - **Example Request**:
     ```json
     {
       "headers": {
         "csrf-token": "your_csrf_token",
         "cookie": "your_cookie"
       }
     }
     ```
   - **Response**:
     - 200 OK: LinkedIn connections data.
     - 500 Internal Server Error: Error message and details.

### Headers Retrieval
To obtain the necessary headers for making requests to these endpoints:
1. Open your browser's Developer Tools (usually accessed by pressing F12 or right-clicking on the page and selecting "Inspect").
2. Navigate to the "Network" tab.
3. Perform an action on LinkedIn that interacts with the API (e.g., loading your profile, sending a message).
4. Look for any network request URLs that include "voyager" in their path.
5. Click on one of these requests and check the "Headers" section.
6. Copy the required headers, including `csrf-token` and `cookie`, for use in your API requests.

By following these steps, you can get the necessary headers to authenticate and interact with the LinkedIn API through your server.

### Example Usage

**Fetching a Profile**:
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

**Sending a Message**:
```bash
curl -X POST "http://3.109.158.37/api/v1/send/67890" \
-H "Content-Type: application/json" \
-d '{
  "text": "Hello, this is a test message.",
  "senderId": "urn:li:fsd_profile:ACoAADFPm0wBD8_2w8dpux66aLduR0lOhqN2zKk"
}'
```

**Getting Connections**:
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