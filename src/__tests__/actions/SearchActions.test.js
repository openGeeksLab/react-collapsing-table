import * as actions from '../../actions/SearchActions';

describe('Search Actions', () => {
    //SEARCH FOR RESULTS HELPER FUNCTIONS
    //TODO: do I need more tests for theses?
    it('should return the correct length of a string', () => {
        const given = 'Paul';
        const expected = 4;

        expect(actions.length(given)).toEqual(expected);
    });

    it('should return the sum of two numbers', () => {
        const a = 3;
        const b = 4;
        const expected = 7;

        expect(actions.sum(a, b)).toEqual(expected);
    });
    it('should return the correct indexes when found once', () => {
        const searchingFor = 'a';
        const searchingAgainst = 'Paul';
        const expected = [1,];

        expect(actions.indexesOf(searchingFor).in(searchingAgainst)).toEqual(expected);
    });

    it('should return the correct indexes when found twice', () => {
        const searchingFor = 'a';
        const searchingAgainst = 'Paula';
        const expected = [1,4];

        expect(actions.indexesOf(searchingFor).in(searchingAgainst)).toEqual(expected);
    });

    it('should return the correct indexes when found twice', () => {
        const searchingFor = 'a';
        const searchingAgainst = 'Paul has some tea';
        const expected = [1, 6, 16];

        expect(actions.indexesOf(searchingFor).in(searchingAgainst)).toEqual(expected);
    });

    it('should return no indexes', () => {
        const searchingFor = 'matt';
        const searchingAgainst = 'Paul has some tea';
        const expected = [];

        expect(actions.indexesOf(searchingFor).in(searchingAgainst)).toEqual(expected);
    });

    it('should insert a span at the correct index spot', () => {
        const indexToInsertAt = 4;
        const stringToInsert = '</span>';
        const stringBeingInsertedInto = 'Paul has some tea';
        const expected = 'Paul</span> has some tea';

        expect(actions.insert(stringBeingInsertedInto, indexToInsertAt, stringToInsert)).toEqual(expected);
    });
    //SEARCH ROWS
    it('should find no rows that match the search criteria', () => {
        const given = {
            state: {
                columns: [
                    { accessor: 'firstName' },
                    { accessor: 'lastName' },
                ],
                rows: [
                    { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                    { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                    { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
                ],
                pagination: { currentPage: 1, rowSize: 2, totalPages: 2 }
            },
            searchString: 'matthew',
            initialRows: [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
            ],
        };
        const expected = {
            searchString: 'matthew',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
            rows: [],
            pagination: { currentPage: 1, rowSize: 2, totalPages: 1 }
        };
        expect(actions.searchRows(given)).toEqual(expected);
    });

    it('should find one row that match the search criteria', () => {
        const given = {
            state: {
                columns: [
                    { accessor: 'firstName' },
                    { accessor: 'lastName' },
                ],
                rows: [
                    { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                    { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                    { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
                ],
                pagination: { currentPage: 1, rowSize: 2, totalPages: 2 },
            },
            searchString: 'g',
            initialRows: [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
            ],
        };
        const expected = {
            searchString: 'g',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],

            rows: [
                { firstName: 'Paul', lastName: 'Darra<span class="highlight">g</span>h', isOpen: true },
            ],
            pagination: { currentPage: 1, rowSize: 2, totalPages: 1 }
        };
        expect(actions.searchRows(given)).toEqual(expected);
    });

    it('should find multiple rows that match the search criteria', () => {
        const given = {
            state: {
                columns: [
                    { accessor: 'firstName' },
                    { accessor: 'lastName' },
                ],
                rows: [
                    { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                    { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                    { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
                ],
                pagination: { currentPage: 1, rowSize: 2, totalPages: 2 }
            },
            searchString: 'm',
            initialRows: [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
            ],
        };
        const expected = {
            searchString: 'm',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
            rows: [
                { firstName: '<span class="highlight">M</span>att', lastName: 'S<span class="highlight">m</span>ith', isOpen: true },
                { firstName: '<span class="highlight">M</span>ichelle', lastName: 'Piper', isOpen: true },
            ],
            pagination: { currentPage: 1, rowSize: 2, totalPages: 1 }
        };
        expect(actions.searchRows(given)).toEqual(expected);
    });

    it('should ignore data that is not viewable by a search', () => {
        const given = {
            state: {
                columns: [
                    { accessor: 'firstName' },
                    { accessor: 'lastName' },
                ],
                rows: [
                    { firstName: 'Paul', lastName: 'Darragh', email: 'p@d.com' },
                    { firstName: 'Winston', lastName: 'Smith', email: 'smith@gmail.com' },
                    { firstName: 'Tony', lastName: 'Blacksmith', email: 'tony.w.blacksmith@gmail.com' },
                ],
                pagination: { currentPage: 1, rowSize: 2, totalPages: 2 },
            },
            searchString: 'W',
            initialRows: [
                { firstName: 'Paul', lastName: 'Darragh', email: 'p@d.com' },
                { firstName: 'Winston', lastName: 'Smith', email: 'smith@gmail.com' },
                { firstName: 'Tony', lastName: 'Blacksmith', email: 'tony.w.blacksmith@gmail.com' },
            ],
        };
        const expected = {
            searchString: 'W',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
            rows: [
                { firstName: '<span class="highlight">W</span>inston', lastName: 'Smith', email: 'smith@gmail.com' },
            ],
            pagination: { currentPage: 1, rowSize: 2, totalPages: 1 }
        };
        expect(actions.searchRows(given)).toEqual(expected);
    });

    it('should not change anything when an empty string is entered', () => {
        const given = {
            state: {
                columns: [
                    { accessor: 'firstName' },
                    { accessor: 'lastName' },
                ],
                rows: [
                    { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                    { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                    { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
                ],
                pagination: { currentPage: 1, rowSize: 2, totalPages: 2 },
            },
            searchString: '',
            initialRows: [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
            ],
        };
        const expected = {
            searchString: '',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
            rows: [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
            ],
            pagination: { currentPage: 1, rowSize: 2, totalPages: 2 }
        };
        expect(actions.searchRows(given)).toEqual(expected);
    });

    it('should change the current page to back to the first page always', () => {
        const given = {
            state: {
                columns: [
                    { accessor: 'firstName' },
                    { accessor: 'lastName' },
                ],
                rows: [
                    { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                    { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                    { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
                ],
                pagination: { currentPage: 4, rowSize: 2, totalPages: 2 },
            },
            searchString: '',
            initialRows: [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
            ],
        };
        const expected = {
            searchString: '',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
            rows: [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
            ],
            pagination: { currentPage: 1, rowSize: 2, totalPages: 2 }
        };
        expect(actions.searchRows(given)).toEqual(expected);
    });

    it('should not crash if no initialRows are passed in to search rows', () => {
        const given = {
            state: {
                columns: [
                    { accessor: 'firstName' },
                    { accessor: 'lastName' },
                ],
                rows: [
                    { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                    { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                    { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
                ],
                pagination: { currentPage: 4, rowSize: 2, totalPages: 2 },
            },
            searchString: '',
        };
        const expected = {
            searchString: '',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
            rows: [],
            pagination: { currentPage: 1, rowSize: 2, totalPages: 1 }
        };
        expect(actions.searchRows(given)).toEqual(expected);
    });

    //SEARCH ROW
    it('should should find no search row attributes that match the search criteria', () => {
        const given = {
            row: { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
            upperCaseSearchString: 'MATT',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
        };
        const expected = {
            updatedRow: { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
            flag: false,
        };
        expect(actions.searchRow(given)).toEqual(expected);
    });

    it('should find one row attribute that match the search criteria', () => {
        const given = {
            row: { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
            upperCaseSearchString: 'L',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
        };
        const expected = {
            updatedRow: { firstName: 'Pau<span class="highlight">l</span>', lastName: 'Darragh', isOpen: true },
            flag: true,
        };
        expect(actions.searchRow(given)).toEqual(expected);
    });

    it('should find multiple row attributes that match the search criteria', () => {
        const given = {
            row: { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
            upperCaseSearchString: 'A',
            columns: [
                { accessor: 'firstName' },
                { accessor: 'lastName' },
            ],
        };
        const expected = {
            updatedRow: { firstName: 'P<span class="highlight">a</span>ul', lastName: 'D<span class="highlight">a</span>rr<span class="highlight">a</span>gh', isOpen: true },
            flag: true,
        };
        expect(actions.searchRow(given)).toEqual(expected);
    });

    //CHECK FOR SEARCH TERM
    it('should return a match and that for this cell there were changes', () => {
        const given = { key: 'firstName', value: 'Paul', upperCaseSearchString: 'A'};
        const expected = { anyIndexes: true, newRowValue: 'P<span class="highlight">a</span>ul' };

        expect(actions.checkForSearchTerm(given)).toEqual(expected);
    });

    it('should return no match and that for this cell there were no changes ', () => {
        const given = { key: 'firstName', value: 'Paul', upperCaseSearchString: 'MATT'};
        const expected = { anyIndexes: false, newRowValue: 'Paul' };

        expect(actions.checkForSearchTerm(given)).toEqual(expected);
    });

    it('should catch and handle an undefined value', () => {
        const given = { key: 'firstName', value: undefined, upperCaseSearchString: 'MATT'};
        const expected = { anyIndexes: false, newRowValue: '' };

        expect(actions.checkForSearchTerm(given)).toEqual(expected);
    });

    it('should catch and handle any non string', () => {
        const given = { key: 'date', value: { d: '28', m: '05', y: '1992' }, upperCaseSearchString: 'MATT'};
        const expected = { anyIndexes: false, newRowValue: '' };

        expect(actions.checkForSearchTerm(given)).toEqual(expected);
    });

    //TRY TO INSERT
    it('should insert a span opening and closing tag for one found results', () => {
        const given = { indexes: [1], rowValue: 'Paul', searchString: 'a' };
        const expected = { anyIndexes: true, newRowValue: 'P<span class="highlight">a</span>ul' };

        expect(actions.tryToInsertSpan(given)).toEqual(expected);
    });

    it('should insert a span opening and closing tag for multiple found results', () => {
        const given = { indexes: [1, 6, 16], rowValue: 'Paul has some tea', searchString: 'a' };
        const expected = { anyIndexes: true, newRowValue: 'P<span class="highlight">a</span>ul h<span class="highlight">a</span>s some te<span class="highlight">a</span>' };

        expect(actions.tryToInsertSpan(given)).toEqual(expected);
    });

    it('should not insert a span opening tag because there are no found results', () => {
        const given = { indexes: [], rowValue: 'Paul has some tea', searchString: 'matt' };
        const expected = { anyIndexes: false, newRowValue: 'Paul has some tea' };

        expect(actions.tryToInsertSpan(given)).toEqual(expected);
    });
    //CLEAR SEARCH RESULTS
    it('should reset the page to the initial view', () => {
        const given = {
            state: {
                searchString: 'Matt',
                rows: [
                    { isOpen: true, firstName: 'Matt', },
                ],
                pagination: {
                    currentPage: 3,
                    pageSize: 15,
                },
            },
            initialRows: [
                { isOpen: false, firstName: 'Paul', },
                { isOpen: true, firstName: 'Matt', },
                { isOpen: false, firstName: 'Michelle', },
            ],
        };
        const expected = {
            searchString: '',
            rows: [
                { isOpen: false, firstName: 'Paul', },
                { isOpen: true, firstName: 'Matt', },
                { isOpen: false, firstName: 'Michelle', },
            ],
            pagination: {
                currentPage: 1,
                pageSize: 15,
            },
        };

        expect(actions.clearSearch(given)).toEqual(expected);
    });

    it('should not crash if no initialRows are passed in to clear search', () => {
        const given = {
            state: {
                searchString: 'Matt',
                rows: [
                    { isOpen: true, firstName: 'Matt', },
                ],
                pagination: {
                    currentPage: 3,
                    pageSize: 15,
                },
            },
        };
        const expected = {
            searchString: '',
            rows: [],
            pagination: {
                currentPage: 1,
                pageSize: 15,
            },
        };

        expect(actions.clearSearch(given)).toEqual(expected);
    });
});
