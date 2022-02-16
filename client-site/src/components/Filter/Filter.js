import React, {useEffect, useState} from 'react';
import styles from "./Filter.module.scss";


import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import WineBarIcon from '@mui/icons-material/WineBar';
import IcecreamIcon from '@mui/icons-material/Icecream';
const Filter = ({ allMenu,setFiltered,activeMenu,setActiveMenu}) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if(activeMenu === ""){
            setFiltered(allMenu);
            return;
        }
        const filtered = allMenu.filter((menu) => menu.category.includes(activeMenu));
        setFiltered(filtered);
    }, [activeMenu])
    return (
        <div className={styles.filterWrapper}>
            <Box sx={{ width: 700 }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Semua Menu" icon={<LocalDiningIcon />} onClick={() => setActiveMenu("")}/>
                    <BottomNavigationAction label="Makanan Utama" icon={<DinnerDiningIcon />} onClick={() => setActiveMenu("61dbb874a59f547c07e1ce1e")} />
                    <BottomNavigationAction label="Snacks" icon={<WineBarIcon />} onClick={() => setActiveMenu("61dbb880a59f547c07e1ce24")} />
                    <BottomNavigationAction label="Minuman" icon={<IcecreamIcon />} onClick={() => setActiveMenu("61dbb879a59f547c07e1ce21")}/>
                </BottomNavigation>
            </Box>
        </div>
    );
};

export default Filter;