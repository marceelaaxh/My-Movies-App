import "../src/app/global.css"
import type { Preview } from '@storybook/react'
import { Import } from 'lucide-react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;