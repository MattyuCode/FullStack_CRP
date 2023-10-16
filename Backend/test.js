const tablaTerminacionAño = {
    0: 220,
    1: 206,
    2: 192,
    3: 178,
    4: 164,
    5: 149,
    6: 135,
    7: 121,
    8: 107,
    9: 93,
    10: 78,
    11: 64,
    12: 50,
    13: 36,
    14: 21,
    15: 7,
    16: 249,
    17: 235,
    18: 221,
    19: 207,
    20: 193,
    21: 179,
    22: 164,
    23: 150,
    24: 136,
    25: 122,
    26: 108,
    27: 94,
    28: 79,
    29: 65,
    30: 51,
    31: 37,
    32: 22,
    33: 8,
    34: 250,
    35: 236,
    36: 222,
    37: 208,
    38: 194,
    39: 180,
    40: 165,
    41: 151,
    42: 137,
    43: 123,
    44: 109,
    45: 95,
    46: 80,
    47: 66,
    48: 52,
    49: 38,
    50: 23,
    51: 9,
    52: 251,
    53: 237,
    54: 223,
    55: 209,
    56: 195,
    57: 181,
    58: 166,
    59: 152,
    60: 138,
    61: 124,
    62: 110,
    63: 96,
    64: 81,
    65: 67,
    66: 53,
    67: 39,
    68: 24,
    69: 10,
    70: 252,
    71: 238,
    72: 224,
    73: 210,
    74: 196,
    75: 182,
    76: 167,
    77: 153,
    78: 139,
    79: 125,
    80: 111,
    81: 97,
    82: 82,
    83: 68,
    84: 54,
    85: 40,
    86: 25,
    87: 11,
    88: 253,
    89: 239,
    90: 225,
    91: 211,
    92: 197,
    93: 183,
    94: 168,
    95: 154,
    96: 140,
    97: 126,
    98: 112,
    99: 98,
  };
  
  // Tabla de valores para los meses
  const tablaMeses = {
    'enero': 174,
    'febrero': 148,
    'marzo': 121,
    'abril': 95,
    'mayo': 68,
    'junio': 42,
    'julio': 15,
    'agosto': 237,
    'septiembre': 211,
    'octubre': 184,
    'noviembre': 158,
    'diciembre': 131,
  };
  
  const tablaSiglos = {
    16: 0,
    17: 5,
    18: 10,
    19: 15,
    20: 20,
    21: 125,
    22: 130,
    23: 135,
    24: 140,
    25: 145,
    26: 150,
    27: 155,
    28: 160,
    29: 165,
    30: 170,
    31: 175,
    32: 180,
    33: 185,
    34: 190,
    35: 195,
    36: 200,
    37: 205,
    38: 210,
    39: 215,
    40: 220,
    41: 225,
    42: 230,
    43: 235,
    44: 240,
    45: 245,
    46: 250,
    47: 255,
    48: 260,
    49: 265,
    50: 270,
    51: 275,
    52: 280,
    53: 285,
    54: 290,
    55: 295,
    56: 300,
    57: 305,
    58: 310,
    59: 315,
    60: 320,
    61: 325,
    62: 330,
    63: 335,
    64: 340,
    65: 345,
    66: 350,
    67: 355,
    68: 360,
    69: 365,
    70: 370,
    71: 375,
    72: 380,
    73: 385,
    74: 390,
    75: 395,
    76: 400,
    77: 405,
    78: 410,
    79: 415,
    80: 420,
    81: 425,
    82: 430,
    83: 435,
    84: 440,
    85: 445,
    86: 450,
    87: 455,
    88: 460,
    89: 465,
    90: 470,
    91: 475,
    92: 480,
    93: 485,
    94: 490,
    95: 495,
    96: 500,
    97: 505,
    98: 510,
    99: 515,
    100: 520,
    101: 525,
    102: 530,
    103: 535,
    104: 540,
    105: 545,
    106: 550,
    107: 555,
    108: 560,
    109: 565,
    110: 570,
    111: 575,
    112: 580,
    113: 585,
    114: 590,
    115: 595,
    116: 600,
    117: 605,
    118: 610,
    119: 615,
    120: 620,
    121: 625,
    122: 630,
    123: 635,
    124: 640,
    125: 645,
    126: 650,
    127: 655,
    128: 660,
    129: 665,
    130: 670,
    131: 675,
    132: 680,
    133: 685,
    134: 690,
    135: 695,
    136: 700,
    137: 705,
    138: 710,
    139: 715,
    140: 720,
    141: 725,
    142: 730,
    143: 735,
    144: 740,
    145: 745,
    146: 750,
    147: 755,
    148: 760,
    149: 765,
    150: 770,
    151: 775,
    152: 780,
    153: 785,
    154: 790,
    155: 795,
    156: 800,
    157: 805,
    158: 810,
    159: 815,
    160: 820,
    161: 825,
    162: 830,
    163: 835,
    164: 840,
    165: 845,
    166: 850,
    167: 855,
    168: 860,
    169: 865,
    170: 870,
    171: 875,
    172: 880,
    173: 885,
    174: 890,
    175: 895,
    176: 900,
    177: 905,
    178: 910,
    179: 915,
    180: 920,
    181: 925,
    182: 930,
    183: 935,
    184: 940,
    185: 945,
    186: 950,
    187: 955,
    188: 960,
    189: 965,
    190: 970,
    191: 975,
    192: 980,
    193: 985,
    194: 990,
    195: 995,
    196: 1000,
  };
  
  
  // Definir la tabla de posiciones Tzolk'in
  const tablaTzolkin = [
    'Imix', 'Ik', 'Akbal', 'Kan', 'Chikchan',
    'Kimi', 'Manik', 'Lamat', 'Muluk', 'Ok',
    'Chuen', 'Eb', 'Ben', 'Ix', 'Men',
    'Kib', 'Kabankil', 'Etz\'nab', 'Kawak', 'Ajaw',
  ];
  
  // Función para calcular la fecha Tzolk'in
  function calcularFechaTzolkin(dia, mes, año) {
    // Obtener el año en formato de dos dígitos (terminación)
    const terminacionAño = año % 100;
  
    // Obtener el valor del mes
    const valorMes = tablaMeses[mes.toLowerCase()];
  
    // Obtener el valor del siglo
    const siglo = Math.floor(año / 100);
    const valorSiglo = tablaSiglos[siglo];
  
    // Calcular la suma total
    let sumaTotal = terminacionAño + valorMes + valorSiglo + dia;
  
    // Asegurarse de que la suma esté dentro del rango 1-260
    while (sumaTotal > 260) {
      sumaTotal -= 260;
    }
  
    // Obtener la fecha Tzolk'in correspondiente
    const fechaTzolkin = tablaTzolkin[sumaTotal - 1];
  
    return fechaTzolkin;
  }
  
  // Ejemplo de uso
  const diaGregoriano = 10;
  const mesGregoriano = 'septiembre';
  const añoGregoriano = 2005;
  
  const fechaTzolkin = calcularFechaTzolkin(diaGregoriano, mesGregoriano, añoGregoriano);
  console.log(`La fecha Tzolk'in correspondiente es: ${fechaTzolkin}`);
  