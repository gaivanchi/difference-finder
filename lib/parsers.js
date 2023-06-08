import yaml from 'js-yaml';

const parse = (data, extension) => {
  let parser;

  if (extension === '.json') {
    parser = JSON.parse;
  } else if (extension === '.yml' || extension === '.yaml') {
    parser = yaml.load;
  }

  return parser(data);
};

export default parse;
