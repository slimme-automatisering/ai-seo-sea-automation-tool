import { DataGrid, GridRenderCellParams, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, Chip } from '@mui/material';

interface KeywordData {
  id: number;
  keyword: string;
  position: number;
  volume: string;
  trend: string;
}

type TrendCellParams = GridRenderCellParams<KeywordData, any>;

const TopKeywords = () => {
  const columns: GridColDef<KeywordData>[] = [
    { field: 'keyword', headerName: 'Keyword', flex: 1, type: 'string' },
    { field: 'position', headerName: 'Positie', width: 100, type: 'number' },
    { field: 'volume', headerName: 'Zoekvolume', width: 130, type: 'string' },
    { 
      field: 'trend', 
      headerName: 'Trend', 
      width: 100,
      type: 'string',
      renderCell: (params: TrendCellParams) => {
        const value = params.value as string;
        return (
          <Chip 
            label={value} 
            color={value === 'up' ? 'success' : 'error'} 
          />
        );
      }
    }
  ];

  const rows: KeywordData[] = [
    { id: 1, keyword: 'SEO optimalisatie', position: 3, volume: '1.2K', trend: 'up' },
    // ... meer data
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Top Keywords</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        autoHeight
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default TopKeywords;
