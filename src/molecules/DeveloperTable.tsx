import React, { useState, useEffect } from 'react';
import { Table, Column, Avatar } from 'react-rainbow-components';
import styled from 'styled-components'
import { developerFilter, frameworkFilter, frameworks } from 'src/types'

const EMPTY_TABLE_MESSAGE = "Any developers found for this query"

type sortDirection = 'asc' | 'desc' | undefined // Precise the type used by default in the library (string)
type dataType = string
type dataObject = {
    username: dataType,
    name: dataType,
    url: dataType,
    frameworks: frameworks,
    avatar: dataType,
    // ⬇️ components injected in the columns of the DeveloperTable
    urlComponent?: React.ReactElement<any, any> | null
    frameworkComponent?: React.ReactElement<any, any> | null,
    avatarComponent?: React.ReactElement<any, any> | null,
}
type developerTableData = Array<dataObject>

export type DeveloperTableProps = {
    data: developerTableData,
    filters: {
        developer: developerFilter,
        framework: frameworkFilter
    }
    styles: React.CSSProperties
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
// ----------------------------------------------------------------------

// Component dedicated to render a link into a Column in DeveloperTable
// Workaround to avoid unecessary Context
const LinkInDeveloperTable: React.FC<dataObject> = (props) => {
    return (
        <a href={props.url}>{props.url}</a>
    )
}

const ArrayToStringInTable: React.FC<dataObject> = (props) => {
    return (
        <p>{props.frameworks.join(', ')}</p>
    )
}

// since the attribute "component" of Coulmn can not have a component with props
// It renders the component first which should be passed to the Column's field attribute
const developerDataToJsx = (data: developerTableData): developerTableData => {
    return data.map(developer => {
        developer.frameworkComponent = ArrayToStringInTable(developer)
        developer.avatarComponent = AvatarInDeveloperTable(developer)
        developer.urlComponent = LinkInDeveloperTable(developer)
        return developer
    })
}

const DeveloperTable: React.FC<DeveloperTableProps> = (props) => {
    const [data, setData] = useState<developerTableData>(developerDataToJsx([...props.data]))
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

    // Sort the table on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => sortRows(sortedBy, sortDirection), [])

    // Sort by developer name
    useEffect(() => {
        const devName = props.filters.developer
        if (devName !== null && devName !== '') {
            const [name, username] = devName.split(',')
            if (username === undefined) {
                setData(data.filter(developer => developer.name.includes(devName) || developer.username.includes(devName)))
            } else {
                setData(data.filter(developer => developer.name.includes(name) || developer.username.includes(username)))
            }
        } else {
            setData(props.data)
        }
        // Only run on props.filters.developer changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filters.developer])

    // Sort by framework
    useEffect(() => {
        const frameworkSelected = props.filters.framework
        if (frameworkSelected !== 'Both') {
            setData(props.data.filter(developer => developer.frameworks.includes(frameworkSelected)))
        } else {
            setData(props.data)
        }
        // Only run on props.filters.developer changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filters.framework])

    return (
        <main style={props.styles}>
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
                <Column header="Frameworks" field="frameworkComponent" />
                <Column header="URL" field="urlComponent" />
            </Table>
        </main>
    );
}

export default DeveloperTable;