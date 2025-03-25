export const getThemeClass = (theme: string, styles: Record<string, string>) => {
    if (!styles) return ""; // Проверяем, что переданы стили

    return theme === "dark"
        ? styles["dark"]
        : theme === "gray"
        ? styles["gray"]
        : styles["light"];
};
