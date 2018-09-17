//React
import React from 'react';
import { RowPropType } from '../utils/propTypes';
//Components
import Cell from './Cell';
import ExpandedRow from './ExpandedRow';

const Row = ({ row, visibleColumns, hiddenColumns, expandRow, rowIndex, callbacks, icons }) => {
    const hiddenColumnsLength = hiddenColumns.length;

    const cells = visibleColumns.map(({ accessor, CustomComponent }, index) => {
        return <Cell key={ accessor }
                     row={ row }
                     rowIndex={ rowIndex }
                     cellIndex={ index }
                     icons={ icons }
                     accessor={ accessor }
                     expandRow={ expandRow }
                     hiddenColumnsLength={ hiddenColumnsLength }
                     CustomComponent={ CustomComponent }
                     CustomFunction={ callbacks[accessor] } />
    });

    const className = `normal-row ${rowIndex % 2 === 0 ? 'odd' : 'even'}`;

    return (
            <tr className={className} key='normalRow'>
                { cells }
            </tr>
    );
};

Row.propTypes = RowPropType;

export default Row
