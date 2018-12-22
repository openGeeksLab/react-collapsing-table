//React
import React from 'react';
import { ColumnsPropType } from '../utils/propTypes';
//Components
import Column from './Column';

const Columns = ({ columns, sortRows, sort, icons, sortable }) => {
    const tableColumns = columns.map(({ accessor, label, sortable, sortFunction, sortFunctions }) => {
        return <Column key={ accessor }
                       accessor={ accessor }
                       icons={ icons }
                       label={ label }
                       sort={ sort }
                       sortable={ sortable && sortable }
                       onClick={ sortRows }
                       sortFunction={ sortFunction }
                       sortFunctions={ sortFunctions }
                       />;
    });
    return (
        <thead>
            <tr>
                { tableColumns }
            </tr>
        </thead>
    );
};

Columns.propTypes = ColumnsPropType;

export default Columns
