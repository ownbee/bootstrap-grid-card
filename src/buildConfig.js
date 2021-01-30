export default (config) => {
  if (!config.cards || !config.cards.length)
    throw new Error('No cards configured!');

  const conf = {
    ...JSON.parse(JSON.stringify(config)),
  };

  return conf;
};
