import { BrowserWindow, screen, ipcMain } from 'electron';
import { customCommandChannelName } from './constants';

export function createCustomCommandReceiver({
  window,
}: {
  window: BrowserWindow;
}) {
  ipcMain.on(customCommandChannelName, async (metadata, message: string) => {
    console.log(`${customCommandChannelName} received a message: `, message);
    switch (message) {
      case 'move-to-bottom-right':
        moveWindowToBottomRight({ window });
        break;
      case 'toggle-maximize':
        toggleMaximize({ window });
        break;
      default:
        console.warn('UH OH no command found for: ', message);
        break;
    }
  });
}

function moveWindowToBottomRight({ window }: { window: BrowserWindow }) {
  const display = screen.getDisplayMatching(window.getBounds());
  const x =
    display.workArea.x + display.workAreaSize.width - window.getSize()[0];
  const y =
    display.workArea.y + display.workAreaSize.height - window.getSize()[1];
  window.setPosition(x, y);
}

function toggleMaximize({ window }: { window: BrowserWindow }) {
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
}
