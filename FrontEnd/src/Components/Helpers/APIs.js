const API_Services = import.meta.env.VITE_APP_MY_ENV_API;

export const API = async (token) => {
  try {
    const response = await fetch(
      `${API_Services}/Menu/GetAllMenus/10/ADMINISTRADOR/LOG`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    const groups = {};
    const pathMenus = {};

    data.forEach((items) => {
      if (!groups[items.DESCRIP_MENU]) {
        groups[items.DESCRIP_MENU] = [];
      }
      groups[items.DESCRIP_MENU].push(items.DESCRIP_SUBMENU);
      pathMenus[items.DESCRIP_SUBMENU] = items.NOMBRE_SUBMENU;
    });

    for (const group in groups) {
      groups[group].forEach((submenu) => {
        // console.log(submenu);
      });
    }

    return { groups, pathMenus };
  } catch (error) {
    console.error(error);
  }
};
