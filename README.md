# DSP Web Controller

A small real-time DSP control interface built with Angular and WebSockets.

This project is a practice application for learning how a browser-based GUI can communicate with an audio/DSP device. The Angular frontend represents the control interface, while a small Node.js WebSocket server acts as a fake DSP device.

Current features include:

- Vertical gain fader
- Mute control
- DSP connection status
- WebSocket connection between the Angular GUI and fake DSP server

## Project Structure

```text
dsp-controller/
├── src/                 # Angular frontend
├── fake-dsp/            # Fake DSP WebSocket server
│   ├── server.js
│   ├── package.json
│   └── node_modules/
├── angular.json
├── package.json
└── README.md
```

## Running the Project

The application uses two separate processes:

1. The fake DSP WebSocket server
2. The Angular development server

You will need two terminal windows.

### 1. Start the fake DSP

From the project root:

```bash
cd fake-dsp
node server.js
```

You should see:

```text
Fake DSP listening on ws://localhost:8080
```

Leave this terminal running.

The fake DSP listens for WebSocket connections at:

```text
ws://localhost:8080
```

### 2. Start the Angular GUI

Open a second terminal and navigate to the project root:

```bash
cd path/to/dsp-controller
ng serve
```

Then open:

```text
http://localhost:4200
```

When the Angular app connects successfully, the fake DSP terminal should print:

```text
GUI connected
```

The web interface should show:

```text
DSP Status: CONNECTED
```

## Testing the Connection

A simple way to test the WebSocket connection is to simulate the DSP going offline.

With both applications running:

1. Confirm the GUI shows `CONNECTED`.
2. Go to the terminal running `node server.js`.
3. Press `Ctrl+C`.
4. The GUI should change to `DISCONNECTED`.

This happens because the browser receives a WebSocket `close` event when the fake DSP server stops.

To reconnect for now:

```bash
cd fake-dsp
node server.js
```

Then refresh the Angular page.

Automatic reconnection has not been implemented yet.

## Current Architecture

```text
Angular GUI
localhost:4200
      │
      │ WebSocket
      │
      ▼
Fake DSP Server
localhost:8080
```

The Angular application currently tracks values such as:

```text
gain
muted
connected
```

Angular signals are used so that changes to application state automatically update the interface.

For example:

```text
DSP disconnects
      ↓
WebSocket close event
      ↓
connected = false
      ↓
Angular updates the UI
      ↓
DSP Status: DISCONNECTED
```

## Setup on a New Machine

Install the project dependencies from the project root:

```bash
npm install
```

Then install the fake DSP dependencies:

```bash
cd fake-dsp
npm install
```

After that, start the fake DSP and Angular frontend using the instructions above.

## Development

The Angular development server automatically reloads when frontend files are changed.

Start it with:

```bash
ng serve
```

The main frontend files currently being worked on are:

```text
src/app/app.ts
src/app/app.html
src/app/app.scss
```

The fake DSP server is located at:

```text
fake-dsp/server.js
```

## Planned Features

Next steps for the project include:

- Send gain changes from Angular to the fake DSP
- Send mute changes from Angular to the fake DSP
- Make the DSP the authoritative source of device state
- Add live input level metering
- Add parametric EQ controls
- Add automatic WebSocket reconnection
- Split the interface into reusable Angular components
- Move WebSocket communication into an Angular service

## Technologies

- Angular
- TypeScript
- HTML / SCSS
- Node.js
- WebSockets
- `ws` Node package

## Build

To create a production Angular build:

```bash
ng build
```

The generated files will be placed in the `dist/` directory.
