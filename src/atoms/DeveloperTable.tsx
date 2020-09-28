import React, { useState, useEffect } from 'react';
import { Table, Column, Avatar } from 'react-rainbow-components';
import styled from 'styled-components'

const TABLE_CONTAINER_STYLES = { height: "70vh" };
const EMPTY_TABLE_MESSAGE = "Any developers found for this query"


type sortDirection = 'asc' | 'desc' | undefined
type dataType = string
type dataObject = {
    username: dataType,
    name: dataType,
    url: dataType,
    avatar: dataType,
    avatarComponent?: React.ReactElement<any, any> | null
}
type developerTableData = Array<dataObject>

export type DeveloperTableProps = {
    data: developerTableData
}


/**
 * ----------------------------------------------------------------------
 * Component dedicated to render an image into a Column in DeveloperTable
 * Workaround to avoid unecessary Context
 */
const StyledAvatar = styled.div`
    display: flex;
    justify-content: left;
    align-items: space-around;
    height: 40px;
`;

const AvatarInDeveloperTable: React.FC<dataObject> = (props) => {
    return (
        <StyledAvatar>
            <Avatar src={props.avatar} assistiveText={`Avatar of ${props.name}`} />
        </StyledAvatar>
    )
}
// since the attribute "component" of Coulmn can not have a component with props
// It renders the component first which should be passed to the Column's field attribute
const avatarUrlToJsx = (data: developerTableData): developerTableData => {
    return data.map(developer => {
        developer.avatarComponent = AvatarInDeveloperTable(developer)
        return developer
    })
}
// ----------------------------------------------------------------------


const DeveloperTable: React.FC<DeveloperTableProps> = (props) => {
    const [data, setData] = useState<developerTableData>(avatarUrlToJsx(props.data))
    const [sortedBy, setSortedBy] = useState<string>('name')
    const [sortDirection, setSortDirection] = useState<sortDirection>('asc')

    const sortRows = (field: string, nextSortDirection: sortDirection): void => {
        let newData = [...data];

        // any type to avoid conflict with dataType as field typed as string is not a valid index
        // the field typed is determined by the react rainbow library and thus can not be changed
        const key = (x: any): dataType => x[field];
        const reverse = nextSortDirection === 'asc' ? 1 : -1;

        const sortedData = newData.sort((a, b) => {
            const [c, d] = [key(a), key(b)];
            return reverse * c.localeCompare(d);
        });

        setData(sortedData)
        setSortedBy(field)
        setSortDirection(nextSortDirection as sortDirection)
    }

    // Wrapper around sortRows that match the signature for Table's onSort attribute
    const handleOnSort = (_event: React.MouseEvent<HTMLElement, MouseEvent>, field: string, nextSortDirection: string): void => {
        sortRows(field, nextSortDirection as sortDirection)
    }

    // Sort the table on first render only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => sortRows(sortedBy, sortDirection), [])

    return (
        <div style={TABLE_CONTAINER_STYLES}>
            <Table
                keyField="name"
                data={data}
                onSort={handleOnSort}
                sortDirection={sortDirection}
                sortedBy={sortedBy}
                emptyTitle={EMPTY_TABLE_MESSAGE}
            >
                <Column header="Avatar" field="avatarComponent" width="100" />
                <Column header="Username" field="username" sortable />
                <Column header="Name" field="name" sortable />
                <Column header="URL" field="url" />
            </Table>
        </div>
    );
}

export default DeveloperTable;