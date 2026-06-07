import storeData from '../DataStorage';

// storeData(selectedSequence, age, id, sex, answers, verdicts, overallVerdict, timer, username, password)
const VALID_ARGS = [
  0,                                                           // selectedSequence → COPD
  '55',                                                        // age
  'P-0042',                                                    // id
  'Male',                                                      // sex
  { '1-1': 'Yes', '2-1': 'No', '3-1': 'No', '4-1': 'No' },  // answers
  { 1: 'Eligible', 2: 'Ineligible', 3: 'No', 4: 'No' },      // verdicts
  'Ineligible',                                                // overallVerdict
  137,                                                         // timer (seconds)
  'dr.smith',                                                  // username
  'LT@1234',                                                   // password
];

describe('DataStorage — storeData', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  // ── Endpoint & method ──────────────────────────────────────────────────────
  it('sends a POST request to the Azure endpoint', () => {
    storeData(...VALID_ARGS);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('https://ltecapi.azurewebsites.net/ltec');
    expect(mockFetch.mock.calls[0][1].method).toBe('POST');
  });

  it('sets Content-Type header to application/json', () => {
    storeData(...VALID_ARGS);
    expect(mockFetch.mock.calls[0][1].headers['Content-Type']).toBe('application/json');
  });

  // ── Disease mapping ────────────────────────────────────────────────────────
  it('maps selectedSequence 0 → "COPD"', () => {
    storeData(0, ...VALID_ARGS.slice(1));
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.disease).toBe('COPD');
  });

  it('maps selectedSequence 1 → "ILD"', () => {
    storeData(1, ...VALID_ARGS.slice(1));
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.disease).toBe('ILD');
  });

  it('maps selectedSequence 2 → "Bronchiectasis"', () => {
    storeData(2, ...VALID_ARGS.slice(1));
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.disease).toBe('Bronchiectasis');
  });

  // ── Patient details ────────────────────────────────────────────────────────
  it('includes patient age in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.age).toBe('55');
  });

  it('includes patient id in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.id).toBe('P-0042');
  });

  it('includes patient sex in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.sex).toBe('Male');
  });

  // ── Assessment data ────────────────────────────────────────────────────────
  it('includes answers object in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.answers).toEqual(VALID_ARGS[4]);
  });

  it('includes verdicts object in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.verdicts).toEqual(VALID_ARGS[5]);
  });

  it('includes overallVerdict in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.overallVerdict).toBe('Ineligible');
  });

  it('includes timer as "duration" in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.duration).toBe(137);
  });

  // ── Credentials ───────────────────────────────────────────────────────────
  it('includes username in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.username).toBe('dr.smith');
  });

  it('includes password in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.password).toBe('LT@1234');
  });

  // ── Timestamp ─────────────────────────────────────────────────────────────
  it('includes a Date field in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.Date).toBeDefined();
    expect(typeof body.Date).toBe('string');
  });

  it('includes a Time field in payload', () => {
    storeData(...VALID_ARGS);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.Time).toBeDefined();
    expect(typeof body.Time).toBe('string');
  });

  // ── Guard: missing data → no fetch ────────────────────────────────────────
  it.each([
    ['selectedSequence', [undefined, ...VALID_ARGS.slice(1)]],
    ['age',             [VALID_ARGS[0], undefined, ...VALID_ARGS.slice(2)]],
    ['id',              [VALID_ARGS[0], VALID_ARGS[1], undefined, ...VALID_ARGS.slice(3)]],
    ['sex',             [VALID_ARGS[0], VALID_ARGS[1], VALID_ARGS[2], undefined, ...VALID_ARGS.slice(4)]],
    ['answers',         [...VALID_ARGS.slice(0, 4), undefined, ...VALID_ARGS.slice(5)]],
    ['verdicts',        [...VALID_ARGS.slice(0, 5), undefined, ...VALID_ARGS.slice(6)]],
    ['overallVerdict',  [...VALID_ARGS.slice(0, 6), undefined, ...VALID_ARGS.slice(7)]],
    ['timer',           [...VALID_ARGS.slice(0, 7), undefined, ...VALID_ARGS.slice(8)]],
    ['username',        [...VALID_ARGS.slice(0, 8), undefined, VALID_ARGS[9]]],
    ['password',        [...VALID_ARGS.slice(0, 9), undefined]],
  ])('does NOT call fetch when %s is undefined', (_field, args) => {
    storeData(...args);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // ── Overalls for all three diseases ───────────────────────────────────────
  it('sends "Eligible" overall verdict correctly', () => {
    const args = [...VALID_ARGS];
    args[6] = 'Eligible';
    storeData(...args);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.overallVerdict).toBe('Eligible');
  });
});
