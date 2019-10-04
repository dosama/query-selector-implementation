const select = require('./');
const fs = require('fs').promises;

beforeAll(async () => {
  document.body.innerHTML = await fs.readFile('./content.html', 'utf8');
});

test('select returns an array', () => {
  expect(Array.isArray(select('h1'))).toBe(true);
});

test('select supports ids', () => {
  expect(select('#company')).toHaveLength(1);
  expect(select('#company')[0].textContent).toBe('EclecticIQ');
});

test('select supports classes', () => {
  expect(select('.product')).toHaveLength(2);
  expect(select('.product')[0].textContent).toBe('EclecticIQ Platform');
  expect(select('.product')[1].textContent).toBe('Fusion Center');
});

test('select supports tag names', () => {
  expect(select('mark')).toHaveLength(4);
  expect(select('mark')[0].textContent).toBe('cybersecurity');
  expect(select('mark')[1].textContent).toBe('cyber threat intelligence');
  expect(select('mark')[2].textContent).toBe('STIX');
  expect(select('mark')[3].textContent).toBe('TAXII');
});

test('select supports selector nesting', () => {
  expect(select('#opensource .project h3')).toHaveLength(4);
  expect(select('#opensource .project h3')[0].textContent).toBe('Cabby');
  expect(select('#opensource .project h3')[1].textContent).toBe('OpenTAXII');
  expect(select('#opensource .project h3')[2].textContent).toBe('datauri');
  expect(select('#opensource .project h3')[3].textContent).toBe('rundoc');
});

test('select supports selector chaining', () => {
  expect(select(`footer#contact a.glassdoor`)[0].getAttribute('href')).toBe(
    'https://www.glassdoor.com/Overview/Working-at-EclecticIQ-EI_IE1098378.11,21.htm',
  );
}
);
