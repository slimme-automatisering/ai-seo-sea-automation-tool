import { DataGrid, GridRenderCellParams, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, Chip } from '@mui/material';

interface KeywordData {
  id: number;
  keyword: string;
  position: number;
  volume: number;
  difficulty: number;
  intent: string;
}

type KeywordCellParams = GridRenderCellParams<KeywordData, any>;

const KeywordPerformanceDetails = () => {
  const columns: GridColDef<KeywordData>[] = [
    { field: 'keyword', headerName: 'Keyword', flex: 1, type: 'string' },
    { field: 'position', headerName: 'Positie', width: 100, type: 'number' },
    { field: 'volume', headerName: 'Zoekvolume', width: 130, type: 'number' },
    { 
      field: 'difficulty', 
      headerName: 'Moeilijkheid', 
      width: 130,
      type: 'number',
      renderCell: (params: KeywordCellParams) => {
        const value = params.value as number;
        return (
          <Chip 
            label={value.toString()} 
            color={value > 50 ? 'error' : 'success'} 
          />
        );
      }
    },
    { 
      field: 'intent', 
      headerName: 'Zoekintentie', 
      width: 150,
      type: 'string',
      renderCell: (params: KeywordCellParams) => {
        const value = params.value as string;
        return (
          <Chip 
            label={value} 
            color={value === 'transactional' ? 'success' : 'info'} 
          />
        );
      }
    }
  ];

  const rows: KeywordData[] = [
    { id: 1, keyword: 'seo optimalisatie', position: 3, volume: 1200, difficulty: 45, intent: 'transactional' },
    // ... meer keywords
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Keyword Performance Details</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        autoHeight
        disableRowSelectionOnClick
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default KeywordPerformanceDetails;
