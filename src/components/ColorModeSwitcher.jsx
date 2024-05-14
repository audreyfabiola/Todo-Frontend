import React, { useEffect, useState } from "react";
import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";
import { useCookies } from "react-cookie";

export function ColorModeSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [cookies, setCookie] = useCookies(["theme"]);
  const [initialColorScheme, setInitialColorScheme] = useState(colorScheme);

  // Function to toggle color scheme and save it to cookies
  const toggleTheme = () => {
    const savedTheme = cookies.theme;
    const newTheme = savedTheme === "light" ? "dark" : "light";
    toggleColorScheme(newTheme);
    setCookie("theme", newTheme, { path: "/" });
  };

  useEffect(() => {
    // Check for saved theme in cookies and change style accordingly
    const savedTheme = cookies.theme;
    if (savedTheme) {
      document.body.style = savedTheme === 'light' ? 'background: #ffe7fd;' : 'background: #79305a;';
    }
  }, [cookies]);

  useEffect(() => {
    // Set initial color scheme based on Mantine's color scheme
    setInitialColorScheme(colorScheme);
  }, [colorScheme]);

  return (
    <Group position="center" mt="xl">
      <ActionIcon
        onClick={toggleTheme}
        size="2xl"
        className="bg-pink-200 rounded-full w-12 h-12 flex items-center justify-center" 
      >
        {initialColorScheme === "dark" ? <Sun size={25} /> : <Moon size={25} />}
      </ActionIcon>
    </Group>
  );
}
