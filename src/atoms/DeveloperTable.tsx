import React, { useState } from 'react';
import { Table, Column } from 'react-rainbow-components';

const tableContainerStyles = { height: 300 };


type sortDirection = 'asc' | 'desc' | undefined
type dataType = string
type dataObject = {
    username: dataType,
    name: dataType,
    url: dataType,
    avatar: dataType
}
type developerTableData = Array<dataObject>

export type DeveloperTableProps = {
    data: developerTableData
}

const DeveloperTable: React.FC<DeveloperTableProps> = (props) => {
    const [data, setData] = useState<developerTableData>(props.data)
    const [sortedBy, setSortedBy] = useState<string>('username')
    const [sortDirection, setSortDirection] = useState<sortDirection>('asc')


    const handleOnSort = (_event: React.MouseEvent<HTMLElement, MouseEvent>, field: string, nextSortDirection: string): void => {
        let newData = [...data];

        const key = (x: any): dataType => x[field];
        const reverse = nextSortDirection === 'asc' ? 1 : -1;

        const sortedData = newData.sort((a, b) => {
            const [c, d] = [key(a), key(b)];
            return reverse * c.localeCompare(d);
        });

        // TODO: replace by states
        setData(sortedData)
        setSortedBy(field)
        setSortDirection(nextSortDirection as sortDirection)
    }

    return (
        <div className="rainbow-p-bottom_xx-large">
            <div style={tableContainerStyles}>
                <Table
                    keyField="id"
                    data={data}
                    onSort={handleOnSort}
                    sortDirection={sortDirection}
                    sortedBy={sortedBy}
                >
                    <Column header="Avatar" field="avatar" />
                    <Column header="Username" field="username" sortable />
                    <Column header="Name" field="name" sortable />
                    <Column header="URL" field="url" />
                </Table>
            </div>
        </div>
    );
}

export default DeveloperTable;