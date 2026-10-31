export const rolePermissions = {
  WEB101: {
    home: {
      R: true,
      tabs: {
        1: { R: true },
      },
    },
    bom: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { C: true, R: true },
        2: { C: true, R: true },
        5: { R: true },
        7: { R: true },
        11: { C: false, R: true },
      },
    },
    bomProducts: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        6: { R: true, U: true, D: true },
        10: { R: true },
        11: { C: false, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    bomSets: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        8: { R: true, U: true, D: true },
        10: { R: true },
        11: { C: false, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    scripting: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { C: false, R: true },
        2: { C: false, R: true },
        3: { C: false, R: true },
        4: { C: false, R: true, U: false, D: false },
        5: { R: true },
        6: { R: true, U: false, D: false },
        7: { R: true },
        8: { R: true, U: false, D: false },
        9: { R: true },
        10: { R: true, U: false, D: false },
      },
    },
    scanning: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    scanningInspectionStep1: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        10: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep2: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        11: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep3: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        12: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep4: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        13: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep5: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        14: { C: false, R: true, U: false, D: false },
      },
    },
    pcp: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    pcpServiceOrders: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        5: { R: true, U: false },
      },
    },
    pcpCutOrders: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        6: { C: false, R: true, U: false, D: false },
      },
    },
    appointment: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
  },

  WEB136: {
    home: {
      R: true,
      tabs: {
        1: { R: true },
      },
    },
    bom: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { C: false, R: true },
        2: { C: false, R: true },
        5: { R: true },
        7: { R: true },
        11: { C: true, R: true },
      },
    },
    bomProducts: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        6: { R: true, U: false, D: false },
        10: { R: true },
        11: { C: true, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    bomSets: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        8: { R: true, U: false, D: false },
        10: { R: true },
        11: { C: true, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    scripting: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { C: true, R: true },
        2: { C: true, R: true },
        3: { C: true, R: true },
        4: { C: true, R: true, U: true, D: true },
        5: { R: true },
        6: { R: true, U: true, D: true },
        7: { R: true },
        8: { R: true, U: true, D: true },
        9: { R: true },
        10: { R: true, U: true, D: true },
      },
    },
    scanning: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    scanningInspectionStep1: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        10: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep2: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        11: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep3: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        12: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep4: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        13: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep5: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        14: { C: false, R: true, U: false, D: false },
      },
    },
    pcp: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    pcpServiceOrders: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        5: { R: true, U: false },
      },
    },
    pcpCutOrders: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        6: { C: false, R: true, U: false, D: false },
      },
    },
    appointment: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    settings: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { C: false, R: true },
        2: { C: false, R: true, U: false },
        5: { R: true },
        6: { R: true, U: false },
      },
    },
  },

  WEB147: {
    home: {
      R: true,
      tabs: {
        1: { R: true },
      },
    },
    bom: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { C: true, R: true },
        2: { C: true, R: true },
        5: { R: true },
        7: { R: true },
        11: { C: true, R: true },
      },
    },
    bomProducts: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        6: { R: true, U: true, D: true },
        10: { R: true },
        11: { C: true, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    bomSets: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        8: { R: true, U: true, D: true },
        10: { R: true },
        11: { C: true, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    scripting: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { C: true, R: true },
        2: { C: true, R: true },
        3: { C: true, R: true },
        4: { C: true, R: true, U: true, D: true },
        5: { R: true },
        6: { R: true, U: true, D: true },
        7: { R: true },
        8: { R: true, U: true, D: true },
        9: { R: true },
        10: { R: true, U: true, D: true },
      },
    },
    scanning: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { C: true, R: true },
      },
    },
    scanningInspectionStep1: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        10: { C: true, R: true },
      },
    },
    scanningInspectionStep2: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        11: { R: true, U: true },
      },
    },
    scanningInspectionStep3: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        12: { R: true, U: true },
      },
    },
    scanningInspectionStep4: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        13: { R: true, U: true },
      },
    },
    scanningInspectionStep5: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        14: { R: true, U: true },
      },
    },
    scanningOrders: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        15: { R: true, U: true },
        16: { R: true, U: true },
      },
    },
    pcp: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    pcpServiceOrders: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        5: { R: true, U: true },
      },
    },
    pcpCutOrders: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        6: { C: true, R: true, U: true, D: true },
      },
    },
    appointment: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    settings: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { C: true, R: true },
        2: { C: true, R: true, U: true },
        5: { R: true },
        6: { R: true, U: true },
      },
    },
  },

  WEB166: {
    home: {
      R: true,
      tabs: {
        1: { R: true },
      },
    },
    bom: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { C: false, R: true },
        2: { C: false, R: true },
        5: { R: true },
        7: { R: true },
        11: { C: false, R: true },
      },
    },
    bomProducts: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        6: { R: true, U: false, D: false },
        10: { R: true },
        11: { C: false, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    bomSets: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        8: { R: true, U: false, D: false },
        10: { R: true },
        11: { C: false, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    scripting: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { C: false, R: true },
        2: { C: false, R: true },
        3: { C: false, R: true },
        4: { C: false, R: true, U: false, D: false },
        5: { R: true },
        6: { R: true, U: false, D: false },
        7: { R: true },
        8: { R: true, U: false, D: false },
        9: { R: true },
        10: { R: true, U: false, D: false },
      },
    },
    scanning: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    scanningInspectionStep1: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        10: { C: true, R: true, U: true, D: true },
      },
    },
    scanningInspectionStep2: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        11: { C: true, R: true, U: true, D: true },
      },
    },
    scanningInspectionStep3: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        12: { C: true, R: true, U: true, D: true },
      },
    },
    scanningInspectionStep4: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        13: { C: true, R: true, U: true, D: true },
      },
    },
    scanningInspectionStep5: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        14: { C: true, R: true, U: true, D: true },
      },
    },
    pcp: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    pcpServiceOrders: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        5: { R: true, U: true },
      },
    },
    pcpCutOrders: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        6: { C: true, R: true, U: true, D: true },
      },
    },
    appointment: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
  },

  WEB173: {
    home: {
      R: true,
      tabs: {
        1: { R: true },
      },
    },
    bom: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { C: false, R: true },
        2: { C: false, R: true },
        5: { R: true },
        7: { R: true },
        11: { C: false, R: true },
      },
    },
    bomProducts: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        6: { R: true, U: false, D: false },
        10: { R: true },
        11: { C: false, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    bomSets: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        8: { R: true, U: false, D: false },
        10: { R: true },
        11: { C: false, R: true },
        12: { R: true },
        13: { R: true },
      },
    },
    scripting: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { C: false, R: true },
        2: { C: false, R: true },
        3: { C: false, R: true },
        4: { C: false, R: true, U: false, D: false },
        5: { R: true },
        6: { R: true, U: false, D: false },
        7: { R: true },
        8: { R: true, U: false, D: false },
        9: { R: true },
        10: { R: true, U: false, D: false },
      },
    },
    scanning: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    scanningInspectionStep1: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        10: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep2: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        11: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep3: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        12: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep4: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        13: { C: false, R: true, U: false, D: false },
      },
    },
    scanningInspectionStep5: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        14: { C: false, R: true, U: false, D: false },
      },
    },
    pcp: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    pcpServiceOrders: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        5: { R: true, U: false },
      },
    },
    pcpCutOrders: {
      C: false,
      R: true,
      U: false,
      D: false,
      tabs: {
        6: { C: false, R: true, U: false, D: false },
      },
    },
    appointment: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
  },

  WEB198: {
    home: {
      R: true,
      tabs: {
        1: { R: true },
      },
    },
    scanning: {
      C: false,
      R: true,
      U: true,
      D: false,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    scanningInspectionStep1: {
      C: false,
      R: true,
      U: true,
      D: false,
      tabs: {
        10: { C: false, R: true, U: true, D: false },
      },
    },
    scanningInspectionStep2: {
      C: false,
      R: true,
      U: true,
      D: false,
      tabs: {
        11: { C: false, R: true, U: true, D: false },
      },
    },
    scanningInspectionStep3: {
      C: false,
      R: true,
      U: true,
      D: false,
      tabs: {
        12: { C: false, R: true, U: true, D: false },
      },
    },
    scanningInspectionStep4: {
      C: false,
      R: true,
      U: true,
      D: false,
      tabs: {
        13: { C: false, R: true, U: true, D: false },
      },
    },
    scanningInspectionStep5: {
      C: false,
      R: true,
      U: true,
      D: false,
      tabs: {
        14: { C: false, R: true, U: true, D: false },
      },
    },
    pcp: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
    pcpServiceOrders: {
      C: false,
      R: false,
      U: false,
      D: false,
      tabs: {
        5: { R: true, U: false },
      },
    },
    pcpCutOrders: {
      C: false,
      R: false,
      U: false,
      D: false,
      tabs: {
        6: { C: false, R: true, U: false, D: false },
      },
    },
    appointment: {
      C: true,
      R: true,
      U: true,
      D: true,
      tabs: {
        1: { R: true },
        2: { R: true },
        3: { R: true },
      },
    },
  },
};

export const hasPermission = (role, page, action, tab = null) => {
  const pagePermissions = rolePermissions[role]?.[page];

  if (!pagePermissions) return false;

  if (tab) {
    const tabPermissions = pagePermissions.tabs?.[tab];
    if (!tabPermissions) return false;

    return tabPermissions[action];
  }

  return pagePermissions[action] || false;
};
