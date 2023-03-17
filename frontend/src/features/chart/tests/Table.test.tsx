import Table from '../components/Table';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { setupTestServer } from '../../../test/server/server';
import { db } from '../../../test/server/db';
import { randomUUID } from 'crypto';

setupTestServer();

describe('Table that handles points', () => {

    const points = [
        {}
    ]

    const tableProps = {
        points, 
        planId: '123', 
        setPoints: jest, 
        yAxis: 'yAxis value'
    }
    test('renders the table', () => {

    })
}) 