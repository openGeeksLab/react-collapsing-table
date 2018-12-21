//React
import React from 'react';
import { ColumnPropType } from '../utils/propTypes';
//Components
import { sortDirection } from '../assets/icons/Icon';

const Column = ({ accessor, label, sortable, onClick, sort, icons, sortFunction, sortFunctions }) => {
    const direction = sort.column === accessor ? sort.direction : 'none';
    const icon = sortable ? sortDirection({ direction, icons }) : "";
    const sortFunc = sortable ? () => onClick({ column: accessor, sortFunction, sortFunctions }) : () => {};
    const cssClass = `column-${accessor} ${ sortable ? 'clickable' : '' }`;

    return (
            <th key={ accessor }
                onClick={ sortFunc }
                className={ cssClass }>{ label }{ icon }</th>
    );
};

Column.propTypes = ColumnPropType;

export default Column
