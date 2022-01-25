import { Tabs, Box, Tab } from "@mui/material";

const TabsWrapper = ({ tabs, value, setValue }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab) => 
            <Tab label={tab.label} key={tab.id}/>
          )}
        </Tabs>
      </Box>
    </Box>
  );
};

export default TabsWrapper;
