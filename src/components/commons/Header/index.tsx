import {
    Flex,
    Heading,
    Text,
    Box,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    IconButton,
    useColorMode
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SettingsIcon, SunIcon } from '@chakra-ui/icons'

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <Text fontSize="2xl">{format(time, 'HH:mm:ss')}</Text>;
}

export function Header() {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex p='5' gap='3' justifyContent='space-between' alignItems='center'>

            <Flex direction='column'>
                <Heading>Dash</Heading>
                <Box>
                    <Clock />
                    <Text as='b'>Setor: </Text>
                    <Text as='i'>{import.meta.env.VITE_SETOR}</Text>
                </Box>
            </Flex>

            <Box>

                <IconButton
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    aria-label="Escolha seu tema"
                />

                <Menu>
                    <MenuButton
                        px={2}
                        py={2}
                        transition='all 0.2s'
                        borderRadius='md'
                        borderWidth='0px'
                        _hover={{ bg: 'gray.400', color: 'white' }}
                        _expanded={{ bg: 'blue.400', color: 'white' }}
                        _focus={{ boxShadow: 'outline' }}
                    >
                        <SettingsIcon w={5} h={5} />
                        <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Preferências</MenuItem>
                        <MenuItem>Baixar relatório</MenuItem>
                    </MenuList>
                </Menu>



            </Box>
        </Flex>
    )
}
