export const handleChangeMode = (light, fan, door) => {
    if (light === 'manual' && fan === 'manual' && door === 'manual') {
        return 0;
    } else if (light === 'automatic' && fan === 'manual' && door === 'manual') {
        return 1;
    } else if (light === 'manual' && fan === 'automatic' && door === 'manual') {
        return 2;
    } else if (light === 'manual' && fan === 'manual' && door === 'automatic') {
        return 3;
    } else if (light === 'automatic' && fan === 'automatic' && door === 'manual') {
        return 4;
    } else if (light === 'automatic' && fan === 'manual' && door === 'automatic') {
        return 5;
    } else if (light === 'manual' && fan === 'automatic' && door === 'automatic') {
        return 6;
    } else return 7;
};

