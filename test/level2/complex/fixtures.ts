import { complex, fortranArrComplex64 as arr64 } from '../../../src/lib/f_func';
import { bandmatrix_nxm_ku_kl, matrix_nxm, vector } from './matrices';

const pI = Infinity;
const nI = -Infinity;
const { PI, sin, cos, abs, sqrt } = Math;

const cospi = x => cos(PI * x);
const sinpi = x => sin(PI * x);


export const fixture = {
    // CGBMV(TRANS,M,N,KL,KU,ALPHA,A,LDA,X,INCX,BETA,Y,INCY)
    cgbmv: {
        case0: {
            desc: 'y = alpha*A*x + beta*y, m=6,n=8,kl=1, ku=1, alpha(0,0), beta(2.5,0.5)',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                kl: 3,
                ku: 2,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: complex(2.5, +0.5),
                alpha: complex(0, 0),
                //bandmatrix_nxm_ku_kl(n = 6, m = 6, lda = m, kl = 3, ku = 2)
                a: bandmatrix_nxm_ku_kl(8, 6, 6, 3, 2),
                x: vector(8),
                y: vector(6),
            },
            expect: {
                y: [
                    complex(-2.0085962414741516, 1.6058503985404968),
                    complex(-0.18816410377621651, -0.60837343707680702),
                    complex(1.8727443814277649, -0.72995787858963013),
                    complex(2.9619127362966537, -0.49696569144725800),
                    complex(-0.13906472176313400, 2.5643529072403908),
                    complex(-0.15649497509002686, -0.74832186102867126)
                ]
            },
        },
        case1: {
            desc: 'y = alpha*A*x + beta*y, m=6,n=8,kl=1, ku=1, alpha(0.2,0.8), beta(2.5,0.5)',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                kl: 3,
                ku: 2,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: complex(2.5, +0.5),
                alpha: complex(0.2, 0.8),
                //bandmatrix_nxm_ku_kl(n = 6, m = 6, lda = m, kl = 3, ku = 2)
                a: bandmatrix_nxm_ku_kl(8, 6, 6, 3, 2),
                x: vector(8),
                y: vector(6),
            },
            expect: {
                y: [
                    complex(-1.0943454405994295, 1.0642741157616680),
                    complex(-0.38628598141225878, -1.2014790478399264),
                    complex(0.88995188622798471, -1.1623543999107093),
                    complex(7.9118205360687366E-002, 0.76470894087791352),
                    complex(-5.7862862678327798E-002,
                        0.62930340373117366),
                    complex(-0.36689070841052379, -0.18794836059332087)
                ]
            },
        },
        case2: {
            desc: 'trans="t",m=6,n=8,kl=1, ku=1, alpha(0.2,0.8), beta(2.5,0.5)',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: 3,
                ku: 2,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: complex(0, 0),
                alpha: complex(0.2, 0.8),
                //bandmatrix_nxm_ku_kl(n = 6, m = 6, lda = m, kl = 3, ku = 2)
                a: bandmatrix_nxm_ku_kl(8, 6, 6, 3, 2),
                x: vector(6),
                y: vector(8),
            },
            expect: {
                y: [
                    complex(-0.38810574366012285, -1.6303050664096645),
                    complex(2.3103061857743366, -0.97417280945264095),
                    complex(-4.2076520090095242, -0.50591381502069677),
                    complex(-0.81853765257644051, 1.4503261671516843),
                    complex(2.6631576242668459E-002, -0.63622673851522416),
                    complex(0.0000000000000000, 0.0000000000000000),
                    complex(0.0000000000000000, 0.0000000000000000),
                    complex(0.0000000000000000, 0.0000000000000000),
                ]
            },
        },
        case3: {
            desc: 'trans="c",incx=-1, incy=-1,m=6,n=8,kl=1, ku=1, alpha(0.2,0.8), beta(2.5,0.5)',
            input: {
                trans: 'c',
                m: 6,
                n: 8,
                kl: 3,
                ku: 2,
                lda: 6,
                incx: -1,
                incy: -1,
                beta: complex(1, 0),
                alpha: complex(0.2, 0.8),
                //bandmatrix_nxm_ku_kl(n = 6, m = 6, lda = m, kl = 3, ku = 2)
                a: bandmatrix_nxm_ku_kl(8, 6, 6, 3, 2),
                x: vector(6),
                y: vector(8),
            },
            expect: {
                y: [
                    complex(-0.64901006221771240, 0.77214217185974121),
                    complex(-0.11916876584291458, -0.21951562166213989),
                    complex(0.66413569450378418, -0.42481029033660889),
                    complex(0.76170726548233147, -0.74829467121041837),
                    complex(0.49362246616457550, -0.11820536025789097),
                    complex(-0.14226157594261568, -3.1888940811820188),
                    complex(-2.0779711022358427, 1.5114922978334300),
                    complex(-2.4265906255376652, 0.38932194147661164),
                ]
            },
        },
        case4: {
            desc: '(trivial, alpha=1, beta=0)',
            input: {
                trans: 'c',
                m: 6,
                n: 8,
                kl: 3,
                ku: 2,
                lda: 6,
                incx: -1,
                incy: -1,
                beta: complex(1, 0),
                alpha: complex(0, 0),
                //bandmatrix_nxm_ku_kl(n = 6, m = 6, lda = m, kl = 3, ku = 2)
                a: bandmatrix_nxm_ku_kl(8, 6, 6, 3, 2),
                x: vector(6),
                y: vector(8),
            },
            expect: {
                y: [
                    complex(-0.64901006221771240, 0.77214217185974121),
                    complex(-0.11916876584291458, -0.21951562166213989),
                    complex(0.66413569450378418, -0.42481029033660889),
                    complex(1.1009690761566162, -0.41898009181022644),
                    complex(0.14377148449420929, 0.99698686599731445),
                    complex(-0.11775359511375427, -0.27577802538871765),
                    complex(-0.91206836700439453, 1.2560187578201294),
                    complex(-1.4375861883163452, 0.64667439460754395),
                ]
            },
        },
    },
    // CGBMV(TRANS,M,N,KL,KU,ALPHA,A,LDA,X,INCX,BETA,Y,INCY)
    /*
     *trans!='ntc'
     *m < 0
     *n < 0
     *kl < 0
     *ku < 0
     *lda < (kl + ku + 1)
     incx === 0
     incy === 0
    */
    cgbmvErrors: {
        case0: {
            desc: 'trans != ("n","t","c")',
            input: {
                trans: 'x',
                m: 6,
                n: 8,
                kl: 4,
                ku: 4,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case1: {
            desc: 'm<0',
            input: {
                trans: 't',
                m: -6,
                n: 8,
                kl: 4,
                ku: 4,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case2: {
            desc: 'sgbmv, m<0',
            input: {
                trans: 't',
                m: 6,
                n: -8,
                kl: 4,
                ku: 4,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case3: {
            desc: 'kl<0',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: -4,
                ku: 4,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            },
        },
        case4: {
            desc: 'ku<0',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: 4,
                ku: -4,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case5: {
            desc: 'lda < (kl + ku + 1)',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: 4,
                ku: 4,
                lda: 6,
                incx: 1,
                incy: 1,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case6: {
            desc: 'incx=0',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: 4,
                ku: 4,
                lda: 10,
                incx: 0,
                incy: 1,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case7: {
            desc: 'incy=0',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: 4,
                ku: 4,
                lda: 10,
                incx: 1,
                incy: 0,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case8: {
            desc: 'x has no imaginary',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: 4,
                ku: 4,
                lda: 10,
                incx: 1,
                incy: 0,
                beta: 2.5,
                alpha: 1.5,
                x: [0],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case9: {
            desc: 'y has no imaginary',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: 4,
                ku: 4,
                lda: 10,
                incx: 1,
                incy: 0,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                y: [0],
                a: [complex(0, 0)],
            }
        },
        case10: {
            desc: 'y has no imaginary',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                kl: 4,
                ku: 4,
                lda: 10,
                incx: 1,
                incy: 0,
                beta: 2.5,
                alpha: 1.5,
                x: [complex(0, 0)],
                a: [0],
                y: [complex(0, 0)],
            }
        },
    },
    // CGEMV(TRANS,M,N,ALPHA,A,LDA,X,INCX,BETA,Y,INCY)
    cgemv: {
        case0: {
            desc: 'trans=n, inc(1,1), m=6, n=8, alpha(0.8,0.2), beta(0.2,0.8)',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0.8, 0.2),
                beta: complex(0.2, 0.8),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(8),
                incx: 1,
                y: vector(6),
                incy: 1
            },
            expect: {
                y: [
                    complex(-4.0955083795571205, 1.1357517892058278),
                    complex(0.93896042218602016, 1.0838676654345458),
                    complex(-1.5853445176637875, 1.6962449347899724),
                    complex(-0.25555151836345036, -4.3800522220206233),
                    complex(-1.2051793139138998, -2.9157429210651786),
                    complex(0.38280021798680286, 0.19114175133433564),
                ]
            },
        },
        case1: {
            desc: 'trans=n, inc(-1,-1), m=6, n=8, alpha(0.8,0.2), beta(0,0)',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0.8, 0.2),
                beta: complex(0, 0),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(8),
                incx: -1,
                y: vector(6),
                incy: -1
            },
            expect: {
                y: [
                    complex(2.6017477475494872, -0.62451989822044895),
                    complex(1.8074832963400977, -2.2773562366746307),
                    complex(-4.2649596122103990, 2.1071421255650922),
                    complex(0.27753542357045247, -1.9840473842815003),
                    complex(2.2299686271484305, 0.24845760476943476),
                    complex(0.20069066517622025, -1.0213684617581498),
                ]
            },
        },
        case2: {
            desc: 'trans=n, inc(1,1), m=6, n=8, alpha(0.8,0.2), beta(1,0)',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0.8, 0.2),
                beta: complex(1, 0),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(8),
                incx: 1,
                y: vector(6),
                incy: 1
            },
            expect: {
                y: [
                    complex(-3.9970026807046444, 2.2726735819034305),
                    complex(0.66801290992029672, 1.0035901828539755),
                    complex(-1.3938842013734591, 0.82508814026657729),
                    complex(0.29003966083788602, -5.5960115682700131),
                    complex(-0.29257262206414292, -2.2331706205478370),
                    complex(6.7974918648228133E-002, 6.4722209339979742E-002),
                ]
            },
        },
        case3: {
            desc: 'trans=t, inc(1,1), m=6, n=8, alpha(0.8,0.2), beta(1,0)',
            input: {
                trans: 't',
                m: 6,
                n: 8,
                alpha: complex(0.8, 0.2),
                beta: complex(1, 0),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(6),
                incx: 1,
                y: vector(8),
                incy: 1
            },
            expect: {
                y: [
                    complex(-1.0722266311585562, 1.4276441972981582),
                    complex(4.0697286775452355, -1.3751872740072097),
                    complex(-1.7667910641302869, -1.3146598668049647),
                    complex(2.7682588305027580, 0.43286241964465866),
                    complex(0.61287748489518667, -1.2227666045246042),
                    complex(-5.6604442768105556E-002, 1.3467393639005534),
                    complex(-2.2131934192050711, 4.1552655661274187),
                    complex(-2.9062411441513247, 2.3044710975088387),
                ],
            },
        },
        case4: {
            desc: 'trans=c, inc(1,1), m=6, n=8, alpha(0.8,0.2), beta(1,0)',
            input: {
                trans: 'c',
                m: 6,
                n: 8,
                alpha: complex(0.8, 0.2),
                beta: complex(1, 0),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(6),
                incx: 1,
                y: vector(8),
                incy: 1
            },
            expect: {
                y: [
                    complex(2.2502367460895774, 2.0732672240604177),
                    complex(1.5386279370583802, 1.2491393341728396),
                    complex(3.5354757160882668, 0.53153277666431009),
                    complex(-0.65968123771844311, -0.51832467085111289),
                    complex(-8.1751634328745854E-002, 0.52362043122181512),
                    complex(-1.8050991363430615, -0.94441463917334822),
                    complex(-0.25656634156597757, 1.6792353267609732),
                    complex(-2.5932578406614151, -3.5422230487806061),
                ]
            },
        },
        case5: {
            desc: 'trans=n, inc(1,1), m=6, n=8, alpha(0,0), beta(0.2,0.8)',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                beta: complex(0.2, 0.8),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(8),
                incx: 1,
                y: vector(6),
                incy: 1
            },
            expect: {
                y: [
                    complex(-0.74751576107018813, -0.36477962083786153),
                    complex(0.15177874642280853, -0.13923813908156957),
                    complex(0.47267537821345584, 0.44634650418678667),
                    complex(0.55537789695527984, 0.79697925443916384),
                    complex(-0.76883520735554689, 0.31441456547997237),
                    complex(0.19707170422482045, -0.14935848339436175),
                ]
            },
        },
        case6: {
            desc: '(trivial: alpha=0, beta=1)',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                beta: complex(1, 0),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(8),
                incx: 1,
                y: vector(6),
                incy: 1
            },
            expect: {
                y: vector(6).toArr()
            },
        },
    },
    cgemvErrors: {
        case0: {
            desc: 'x has no imaginary part',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                beta: complex(2.5, +0.5),
                incy: 1,
                x: [0],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case1: {
            desc: 'y has no imaginary part',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                beta: complex(2.5, +0.5),
                incy: 1,
                x: [complex(0, 0)],
                y: [0],
                a: [complex(0, 0)],
            }
        },
        case2: {
            desc: 'A has no imaginary part',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                beta: complex(2.5, +0.5),
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [0],
            }
        },
        case3: {
            desc: 'trans !="ntc"',
            input: {
                trans: 'x',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                beta: complex(2.5, +0.5),
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case4: {
            desc: 'n<0',
            input: {
                trans: 'n',
                m: 6,
                n: -8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                beta: complex(2.5, +0.5),
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case5: {
            desc: 'm<0',
            input: {
                trans: 'n',
                m: -6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                beta: complex(2.5, +0.5),
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case6: {
            desc: 'lda<max(1,m)',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 4,
                incx: 1,
                beta: complex(2.5, +0.5),
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case7: {
            desc: 'incx=0',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 0,
                beta: complex(2.5, +0.5),
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case8: {
            desc: 'incy=0',
            input: {
                trans: 'n',
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                beta: complex(2.5, +0.5),
                incy: 0,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
    },
    // CGEMV(TRANS,M,N,ALPHA,A,LDA,X,INCX,BETA,Y,INCY)
    cgerc: {
        case0: {
            desc: 'inc(1,1), m=6, n=8, alpha(0.2,0.8)',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0.2, 0.8),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(6),
                incx: 1,
                y: (() => {
                    let v = vector(8);
                    v.s(4)(0, 0);

                    return v;
                })(),
                incy: 1,
            },
            expect: {
                a: [
                    complex(1.4664377569938685, 1.8060944675544837),
                    complex(-0.53225092996643109, -0.45634091440603552),
                    complex(1.3676711769934335, 0.58364817261230650),
                    complex(1.5273647960307939, -1.2254245383182520),
                    complex(1.1563959711297374, 2.1474949691654932),
                    complex(-1.7831775159348064, 0.50551385861110387),
                    complex(-0.75941169595474800, -0.57340502179859332),
                    complex(-0.28224278033580208, -0.78213264706952679),
                    complex(-0.16007534447744504, -1.1160014767921838),
                    complex(2.1635202157291209, -1.0386515298872647),
                    complex(0.78619566928364970, -1.7700218301387962),
                    complex(-0.78970753495767643, 1.2175962397684426),
                    complex(-1.4891467992751752, 0.27223155051811232),
                    complex(-0.12951010544349723, -0.25532453277181810),
                    complex(-0.17490710560589115, 0.76336937172774166),
                    complex(-0.38122952832127499, 0.38852989041687136),
                    complex(-0.39195398537726411, 2.3235693548980874),
                    complex(-0.69758972915325101, -0.81081531972369780),
                    complex(0.43568331003189087, -5.4877474904060364E-002),
                    complex(-1.2375384569168091, 0.25014132261276245),
                    complex(-0.22426788508892059, 0.61824327707290649),
                    complex(0.37739565968513489, -0.17262350022792816),
                    complex(0.13333636522293091, -2.2239003181457520),
                    complex(0.80418950319290161, -1.2636144161224365),
                    complex(-0.52825871591104467, 1.0515473739625048),
                    complex(0.38661084813518909, -0.18238536895940438),
                    complex(1.5987282580693853, -1.3477283962554565),
                    complex(0.18347150310255600, -0.55494690365844279),
                    complex(-1.0816686910303539, -3.2462525018476240E-003),
                    complex(-7.3848983873964338E-002, 2.4312089369662865E-002),
                    complex(-4.7085681056201645E-002, -1.5882927279464436),
                    complex(-0.52236195772798288, 0.42419417151368499),
                    complex(-0.61206211258427001, 0.32620723072294699),
                    complex(-0.93465874966505846, 0.12460202594829736),
                    complex(0.73057521316282659, -0.22989490997416154),
                    complex(1.1698956214925516, 0.32927391868466860),
                    complex(1.2157758131530922, 2.5345520058413213),
                    complex(-0.74283140469563169, -0.38987560759970030),
                    complex(1.3678114595993076, 0.32901162588415334),
                    complex(0.21513199437223562, -0.15203527634896519),
                    complex(2.8540439631030279, 1.0935453027260844),
                    complex(0.19340614948484969, -1.6512506222549119),
                    complex(0.38594072116787248, 7.9234395057932172E-002),
                    complex(-1.1402800589724982, -0.19270504442970846),
                    complex(-1.5574412841395437, -0.95309580634241586),
                    complex(-1.3486081371207643, 0.89977827692739010),
                    complex(-0.25519137193589581, 0.80878144081759595),
                    complex(0.77664318903912266, -0.71173479570372455),
                ]
            },
        },


        case1: {
            desc: 'inc(1,1), m=6, n=8, alpha(0.8,0.2)',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0.2, 0.8),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(6),
                incx: -1,
                y: vector(8),
                incy: -1,
            },
            expect: {
                a: [
                    complex(0.88306036814678868, 1.0794348476983751),
                    complex(0.98235736678213703, -0.38432509127926684),
                    complex(1.0467817773918699, -0.26657089566477299),
                    complex(0.88155860714158418, -1.2266749209248053),
                    complex(0.10640467108044993, 1.8599184957333317),
                    complex(-0.70122531996791548, 1.5685475206682837),
                    complex(-1.2959069761255018, -0.56408458111912407),
                    complex(0.80142042293998772, -0.15313942732686359),
                    complex(0.48871110895462522, -2.5910351676300931),
                    complex(2.5341606321914707, -2.0663782886284809),
                    complex(0.45027512740123110, -1.6274243463177331),
                    complex(-0.57539383024900737, 2.4281348267336553),
                    complex(-1.1296731508234275, 0.90398264866704470),
                    complex(-0.28563710120446772, -0.47637998868149889),
                    complex(-0.58440221723440966, 0.32545120885206402),
                    complex(-0.59026260782734252, -0.29890814896817697),
                    complex(0.27274978786794912, 2.4996175611869180),
                    complex(-0.70330023119372154, -0.95853341627041833),
                    complex(0.31510815523064040, -0.27282886655532490),
                    complex(-1.0346078437479442, 1.0618637752882218),
                    complex(0.65015746875979019, 0.17912169866508931),
                    complex(0.89035450285278694, -0.57970274468132166),
                    complex(1.6339225000576024E-002, -2.3952402088207974),
                    complex(0.33303756158219378, -0.57079592781056654),
                    complex(0.22244130892187952, 0.27685893490110408),
                    complex(-0.47458924311264428, 1.2988589637548592E-002),
                    complex(1.3633048638346255, 0.16949264392950569),
                    complex(-0.35756317557586070, 0.57362994646994336),
                    complex(-1.0591575896740089, -0.90467331741663981),
                    complex(-0.62343016692152187, -0.47254182333647243),
                    complex(-4.1375179015731151E-002, -1.4405746313997232),
                    complex(-1.1870657309731962, 0.24814596522485438),
                    complex(-0.40302903307820248, 1.0136452701079954),
                    complex(-0.52516363803653998, 0.56252018882397503),
                    complex(0.88670220892379703, -8.8394540644807507E-003),
                    complex(0.81042197304080377, -0.30247717946426378),
                    complex(1.0014621084444231, 1.3240134188761086),
                    complex(-0.40691086281321309, -0.53247309142076349),
                    complex(0.99717104313695781, 1.3567383846253696),
                    complex(-0.43365445905983463, 1.3229984144889442),
                    complex(1.7703807598272381, 0.46455208298342121),
                    complex(0.72990142965560356, -1.6605710629343813),
                    complex(-0.69601147479901848, -0.98379926699924769),
                    complex(-9.0288758923210644E-002, 9.4871429002452989E-002),
                    complex(-0.91163509525033404, -0.95184542373586234),
                    complex(-1.0277187375192007, 1.7499973452044695),
                    complex(-1.7697996686844639, 0.73676561769082727),
                    complex(1.3600205778862025, 1.4924824152384053E-002),
                ]
            },
        },
        case2: {
            desc: '(trivial case)alpha=(0,0)',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                a: matrix_nxm(6, 8, 6),
                lda: 6,
                x: vector(6),
                incx: -1,
                y: vector(8),
                incy: -1,
            },
            expect: {
                a: [
                    complex(1.2629542350769043, 0.99216037988662720),
                    complex(-0.32623335719108582, -0.42951309680938721),
                    complex(1.3297992944717407, 1.2383041381835938),
                    complex(1.2724293470382690, -0.27934628725051880),
                    complex(0.41464143991470337, 1.7579030990600586),
                    complex(-1.5399500131607056, 0.56074607372283936),
                    complex(-0.92856705188751221, -0.45278397202491760),
                    complex(-0.29472044110298157, -0.83204329013824463),
                    complex(-5.7671726681292057E-003, -1.1665705442428589),
                    complex(2.4046533107757568, -1.0655906200408936),
                    complex(0.76359343528747559, -1.5637820959091187),
                    complex(-0.79900926351547241, 1.1565370559692383),
                    complex(-1.1476570367813110, 0.83204710483551025),
                    complex(-0.28946158289909363, -0.22732868790626526),
                    complex(-0.29921510815620422, 0.26613736152648926),
                    complex(-0.41151082515716553, -0.37670272588729858),
                    complex(0.25222346186637878, 2.4413645267486572),
                    complex(-0.89192110300064087, -0.79533910751342773),
                    complex(0.43568331003189087, -5.4877474904060364E-002),
                    complex(-1.2375384569168091, 0.25014132261276245),
                    complex(-0.22426788508892059, 0.61824327707290649),
                    complex(0.37739565968513489, -0.17262350022792816),
                    complex(0.13333636522293091, -2.2239003181457520),
                    complex(0.80418950319290161, -1.2636144161224365),
                    complex(-5.7106774300336838E-002, 0.35872888565063477),
                    complex(0.50360798835754395, -1.1045478284358978E-002),
                    complex(1.0857694149017334, -0.94064915180206299),
                    complex(-0.69095385074615479, -0.11582532525062561),
                    complex(-1.2845993041992188, -0.81496870517730713),
                    complex(4.6726170927286148E-002, 0.24226348102092743),
                    complex(-0.23570655286312103, -1.4250984191894531),
                    complex(-0.54288828372955322, 0.36594113707542419),
                    complex(-0.43331032991409302, 0.24841265380382538),
                    complex(-0.64947164058685303, 6.5288178622722626E-002),
                    complex(0.72675073146820068, 1.9156390801072121E-002),
                    complex(1.1519117355346680, 0.25733837485313416),
                    complex(0.99216037988662720, 1.2629542350769043),
                    complex(-0.42951309680938721, -0.32623335719108582),
                    complex(1.2383041381835938, 1.3297992944717407),
                    complex(-0.27934628725051880, 1.2724293470382690),
                    complex(1.7579030990600586, 0.41464143991470337),
                    complex(0.56074607372283936, -1.5399500131607056),
                    complex(-0.45278397202491760, -0.92856705188751221),
                    complex(-0.83204329013824463, -0.29472044110298157),
                    complex(-1.1665705442428589, -5.7671726681292057E-003),
                    complex(-1.0655906200408936, 2.4046533107757568),
                    complex(-1.5637820959091187, 0.76359343528747559),
                    complex(1.1565370559692383, -0.79900926351547241),
                ]
            },
        },
    },
    cgercErrors: {
        case0: {
            desc: 'x has no imaginary part',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                incy: 1,
                x: [0],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case1: {
            desc: 'y has no imaginary part',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                incy: 1,
                beta: complex(2.5, +0.5),
                x: [complex(0, 0)],
                y: [0],
                a: [complex(0, 0)],
            }
        },
        case2: {
            desc: 'A has no imaginary part',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [0],
            }
        },
        case3: {
            desc: 'n<0',
            input: {
                m: 6,
                n: -8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case4: {
            desc: 'm<0',
            input: {
                m: -6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case5: {
            desc: 'lda<max(1,m)',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 2,
                incx: 1,
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case6: {
            desc: 'incx=0',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 0,
                incy: 1,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
        case7: {
            desc: 'incy=0',
            input: {
                m: 6,
                n: 8,
                alpha: complex(0, 0),
                lda: 6,
                incx: 1,
                incy: 0,
                x: [complex(0, 0)],
                y: [complex(0, 0)],
                a: [complex(0, 0)],
            }
        },
    },
}
