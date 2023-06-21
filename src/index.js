import { AccordionSchemaEnhancer } from './components/Accordion/schema';

const applyConfig = (config) => {
  config.blocks.blocksConfig.accordion = {
    ...config.blocks.blocksConfig.accordion,
    schemaEnhancer: AccordionSchemaEnhancer,
  };

  return config;
};

export default applyConfig;
