"use client";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";
import { userRole } from "@/lib/utils";

export const Menu = () => {
  const pathname = usePathname();
  //console.log("pathname from Menu : ", pathname);
  const user = useCurrentUser();
  // console.log("user form  Menu: ", user);

  return (
    <nav className="flex flex-col w-full max-w-[250px] gap-1">
      <Link
        href="/"
        className={
          "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
          (pathname === "/" ? " text-black    " : " text-gray-text")
        }
      >
        <div
          className={
            "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
            (pathname === "/" ? " bg-blue-icon-bg " : " ")
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            /* fill="#1074D8" fill-red-500 fill-current text-teal-500 */
            xmlns="http://www.w3.org/2000/svg"
            className={pathname === "/" ? " stroke-black" : " stroke-gray-icon"}
          >
            <path
              d="M10 12.5C12.7614 12.5 15 10.2614 15 7.5C15 4.73858 12.7614 2.5 10 2.5C7.23858 2.5 5 4.73858 5 7.5C5 10.2614 7.23858 12.5 10 12.5Z"
              /*  stroke={pathname === "/" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeMiterlimit="10"
            />
            <path
              d="M2.42114 16.8743C3.18955 15.5442 4.29443 14.4398 5.6248 13.672C6.95517 12.9042 8.46417 12.5 10.0002 12.5C11.5363 12.5 13.0453 12.9043 14.3756 13.6721C15.706 14.44 16.8108 15.5444 17.5792 16.8744"
              /*   stroke={pathname === "/" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {userRole(user?.role || "")}
      </Link>

      {user?.role == "MANAGER" && (
        <>
          <Link
            href="/users"
            className={
              "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
              (pathname === "/users" ? " text-black    " : " text-gray-text")
            }
          >
            <div
              className={
                "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
                (pathname === "/users" ? " bg-blue-icon-bg " : " ")
              }
            >
              <svg
                className={
                  "pb-[2px] pr-[2px] " +
                  (pathname === "/users"
                    ? "  stroke-black"
                    : "  stroke-gray-icon")
                }
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="User / Users">
                    <path
                      id="Vector"
                      d="M21 19.9999C21 18.2583 19.3304 16.7767 17 16.2275M15 20C15 17.7909 12.3137 16 9 16C5.68629 16 3 17.7909 3 20M15 13C17.2091 13 19 11.2091 19 9C19 6.79086 17.2091 5 15 5M9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9C13 11.2091 11.2091 13 9 13Z"
                      /* stroke={pathname === "/users" ? " black    " : "#A3AED0"} */
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            Користувачі
          </Link>
        </>
      )}

      {(user?.role == "BRAND" || user?.role == "MANAGER") && (
        <Link
          href="/created-offers"
          className={
            "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
            (pathname === "/created-offers"
              ? " text-black    "
              : " text-gray-text")
          }
        >
          <div
            className={
              "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
              (pathname === "/created-offers" ? " bg-blue-icon-bg " : " ")
            }
          >
            <svg
              className={
                /* "pb-[2px] pr-[2px] " + */
                pathname === "/created-offers"
                  ? "  stroke-black"
                  : "  stroke-gray-icon"
              }
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 10.6875H11.25"
                /* stroke={
                  pathname === "/created-offers" ? " black    " : "#A3AED0"
                } */
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 8.4375H11.25"
                /*  stroke={
                  pathname === "/created-offers" ? " black    " : "#A3AED0"
                } */
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.2501 2.8125H14.0625C14.2117 2.8125 14.3548 2.87176 14.4602 2.97725C14.5657 3.08274 14.625 3.22582 14.625 3.375V15.1875C14.625 15.3367 14.5657 15.4798 14.4602 15.5852C14.3548 15.6907 14.2117 15.75 14.0625 15.75H3.9375C3.78832 15.75 3.64524 15.6907 3.53975 15.5852C3.43426 15.4798 3.375 15.3367 3.375 15.1875V3.375C3.375 3.22582 3.43426 3.08274 3.53975 2.97725C3.64524 2.87176 3.78832 2.8125 3.9375 2.8125H6.74985"
                /* stroke={
                  pathname === "/created-offers" ? " black    " : "#A3AED0"
                } */
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.1875 5.0625V4.5C6.1875 3.75408 6.48382 3.03871 7.01126 2.51126C7.53871 1.98382 8.25408 1.6875 9 1.6875C9.74592 1.6875 10.4613 1.98382 10.9887 2.51126C11.5162 3.03871 11.8125 3.75408 11.8125 4.5V5.0625H6.1875Z"
                /* stroke={
                  pathname === "/created-offers" ? " black    " : "#A3AED0"
                } */
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Додані офери
        </Link>
      )}

      {user?.role == "AFFILIATE" && (
        <Link
          href="/offers-in-work"
          className={
            "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
            (pathname === "/offers-in-work"
              ? " text-black    "
              : " text-gray-text")
          }
        >
          <div
            className={
              "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
              (pathname === "/offers-in-work" ? " bg-blue-icon-bg " : " ")
            }
          >
            <svg
              className={
                /* "pb-[2px] pr-[2px] " + */
                pathname === "/offers-in-work"
                  ? "  stroke-black"
                  : "  stroke-gray-icon"
              }
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 10.6875H11.25"
                /*  stroke={
                  pathname === "/offers-in-work" ? " black    " : "#A3AED0"
                } */
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 8.4375H11.25"
                /* stroke={
                  pathname === "/offers-in-work" ? " black    " : "#A3AED0"
                } */
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.2501 2.8125H14.0625C14.2117 2.8125 14.3548 2.87176 14.4602 2.97725C14.5657 3.08274 14.625 3.22582 14.625 3.375V15.1875C14.625 15.3367 14.5657 15.4798 14.4602 15.5852C14.3548 15.6907 14.2117 15.75 14.0625 15.75H3.9375C3.78832 15.75 3.64524 15.6907 3.53975 15.5852C3.43426 15.4798 3.375 15.3367 3.375 15.1875V3.375C3.375 3.22582 3.43426 3.08274 3.53975 2.97725C3.64524 2.87176 3.78832 2.8125 3.9375 2.8125H6.74985"
                /* stroke={
                  pathname === "/offers-in-work" ? " black    " : "#A3AED0"
                } */
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.1875 5.0625V4.5C6.1875 3.75408 6.48382 3.03871 7.01126 2.51126C7.53871 1.98382 8.25408 1.6875 9 1.6875C9.74592 1.6875 10.4613 1.98382 10.9887 2.51126C11.5162 3.03871 11.8125 3.75408 11.8125 4.5V5.0625H6.1875Z"
                /*  stroke={
                  pathname === "/offers-in-work" ? " black    " : "#A3AED0"
                } */
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Офери у роботі
        </Link>
      )}

      <Link
        href="/media-channels"
        className={
          "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
          (pathname === "/media-channels"
            ? " text-black    "
            : " text-gray-text")
        }
      >
        <div
          className={
            "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
            (pathname === "/media-channels" ? " bg-blue-icon-bg " : " ")
          }
        >
          <svg
            className={
              /* "pb-[2px] pr-[2px] " + */
              pathname === "/media-channels"
                ? "  stroke-black"
                : "  stroke-gray-icon"
            }
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 10.6875H11.25"
              /* stroke={pathname === "/media-channels" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.75 8.4375H11.25"
              /* stroke={pathname === "/media-channels" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.2501 2.8125H14.0625C14.2117 2.8125 14.3548 2.87176 14.4602 2.97725C14.5657 3.08274 14.625 3.22582 14.625 3.375V15.1875C14.625 15.3367 14.5657 15.4798 14.4602 15.5852C14.3548 15.6907 14.2117 15.75 14.0625 15.75H3.9375C3.78832 15.75 3.64524 15.6907 3.53975 15.5852C3.43426 15.4798 3.375 15.3367 3.375 15.1875V3.375C3.375 3.22582 3.43426 3.08274 3.53975 2.97725C3.64524 2.87176 3.78832 2.8125 3.9375 2.8125H6.74985"
              /*   stroke={pathname === "/media-channels" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.1875 5.0625V4.5C6.1875 3.75408 6.48382 3.03871 7.01126 2.51126C7.53871 1.98382 8.25408 1.6875 9 1.6875C9.74592 1.6875 10.4613 1.98382 10.9887 2.51126C11.5162 3.03871 11.8125 3.75408 11.8125 4.5V5.0625H6.1875Z"
              /* stroke={pathname === "/media-channels" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        Медіа канали
      </Link>

      <Link
        href="/offers"
        className={
          "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
          (pathname === "/offers" ? " text-black    " : " text-gray-text")
        }
      >
        <div
          className={
            "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
            (pathname === "/offers" ? " bg-blue-icon-bg " : " ")
          }
        >
          <svg
            className={
              /* "pb-[2px] pr-[2px] " + */
              pathname === "/offers" ? "  stroke-black" : "  stroke-gray-icon"
            }
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 10.6875H11.25"
              /* stroke={pathname === "/offers" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.75 8.4375H11.25"
              /*  stroke={pathname === "/offers" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.2501 2.8125H14.0625C14.2117 2.8125 14.3548 2.87176 14.4602 2.97725C14.5657 3.08274 14.625 3.22582 14.625 3.375V15.1875C14.625 15.3367 14.5657 15.4798 14.4602 15.5852C14.3548 15.6907 14.2117 15.75 14.0625 15.75H3.9375C3.78832 15.75 3.64524 15.6907 3.53975 15.5852C3.43426 15.4798 3.375 15.3367 3.375 15.1875V3.375C3.375 3.22582 3.43426 3.08274 3.53975 2.97725C3.64524 2.87176 3.78832 2.8125 3.9375 2.8125H6.74985"
              /* stroke={pathname === "/offers" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.1875 5.0625V4.5C6.1875 3.75408 6.48382 3.03871 7.01126 2.51126C7.53871 1.98382 8.25408 1.6875 9 1.6875C9.74592 1.6875 10.4613 1.98382 10.9887 2.51126C11.5162 3.03871 11.8125 3.75408 11.8125 4.5V5.0625H6.1875Z"
              /* stroke={pathname === "/offers" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        Офери
      </Link>

      <Link
        href="/profile"
        className={
          "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
          (pathname === "/profile" ? " text-black    " : " text-gray-text")
        }
      >
        <div
          className={
            "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
            (pathname === "/profile" ? " bg-blue-icon-bg " : " ")
          }
        >
          <svg
            className={
              /* "pb-[2px] pr-[2px] " + */
              pathname === "/profile" ? "  stroke-black" : "  stroke-gray-icon"
            }
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.05005 13.3998C3.39593 13.0124 5.01583 11.2298 5.49055 11.2298H10.5099C11.1978 11.2298 12.602 12.7075 12.95 13.2284M15.2 7.9998C15.2 11.9763 11.9765 15.1998 8.00005 15.1998C4.0236 15.1998 0.800049 11.9763 0.800049 7.9998C0.800049 4.02335 4.0236 0.799805 8.00005 0.799805C11.9765 0.799805 15.2 4.02335 15.2 7.9998ZM10.5792 5.54577C10.5792 4.17214 9.41958 3.0498 8.00026 3.0498C6.58098 3.0498 5.42135 4.17214 5.42135 5.54577C5.42135 6.91941 6.58098 8.04174 8.00026 8.04174C9.41954 8.04174 10.5792 6.91941 10.5792 5.54577Z"
              /*  stroke={pathname === "/profile" ? " black    " : "#A3AED0"} */
            />
          </svg>
        </div>
        Профіль
      </Link>

      <Link
        href="/balance"
        className={
          "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
          (pathname === "/balance" ? " text-black    " : " text-gray-text")
        }
      >
        <div
          className={
            "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
            (pathname === "/balance" ? " bg-blue-icon-bg " : " ")
          }
        >
          <svg
            className={
              /* "pb-[2px] pr-[2px] " + */
              pathname === "/balance" ? "  stroke-black" : "  stroke-gray-icon"
            }
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 4.375H2.5C2.15482 4.375 1.875 4.65482 1.875 5V15C1.875 15.3452 2.15482 15.625 2.5 15.625H17.5C17.8452 15.625 18.125 15.3452 18.125 15V5C18.125 4.65482 17.8452 4.375 17.5 4.375Z"
              /* stroke={pathname === "/balance" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.1245 13.125H15.6245"
              /* stroke={pathname === "/balance" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.37451 13.125H10.6245"
              /* stroke={pathname === "/balance" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.87451 7.56641H18.1245"
              /* stroke={pathname === "/balance" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        Баланс
      </Link>

      <Link
        href="/tech-support"
        className={
          "flex flex-row items-center  py-1 px-3 bg-white rounded-lg w-full hover:bg-accent " +
          (pathname === "/tech-support" ? " text-black    " : " text-gray-text")
        }
      >
        <div
          className={
            "flex items-center justify-center w-[30px] h-[24px] rounded-lg mr-2 " +
            (pathname === "/tech-support" ? " bg-blue-icon-bg " : " ")
          }
        >
          <svg
            className={
              /* "pb-[2px] pr-[2px] " + */
              pathname === "/tech-support"
                ? "  stroke-black"
                : "  stroke-gray-icon"
            }
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25476 15.7452C3.53569 15.0262 4.01262 13.5165 3.64662 12.632C3.26722 11.715 1.875 10.9769 1.875 9.99997C1.875 9.02301 3.26722 8.285 3.64663 7.36803C4.01263 6.48346 3.5357 4.97382 4.25476 4.25476C4.97382 3.53569 6.48346 4.01262 7.36804 3.64662C8.28502 3.26722 9.02305 1.875 10 1.875C10.977 1.875 11.715 3.26722 12.632 3.64663C13.5165 4.01263 15.0262 3.5357 15.7452 4.25476C16.4643 4.97382 15.9874 6.48346 16.3534 7.36804C16.7328 8.28502 18.125 9.02305 18.125 10C18.125 10.977 16.7328 11.715 16.3534 12.632C15.9874 13.5165 16.4643 15.0262 15.7452 15.7452C15.0262 16.4643 13.5165 15.9874 12.632 16.3534C11.715 16.7328 10.9769 18.125 9.99997 18.125C9.02301 18.125 8.285 16.7328 7.36803 16.3534C6.48346 15.9874 4.97382 16.4643 4.25476 15.7452Z"
              /* stroke={pathname === "/tech-support" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 15C10.5178 15 10.9375 14.5803 10.9375 14.0625C10.9375 13.5447 10.5178 13.125 10 13.125C9.48223 13.125 9.0625 13.5447 9.0625 14.0625C9.0625 14.5803 9.48223 15 10 15Z"
              /* stroke={pathname === "/tech-support" ? " black    " : "#A3AED0"} */
            />
            <path
              d="M9.99994 11.25V10.625C10.4326 10.625 10.8555 10.4967 11.2152 10.2563C11.575 10.016 11.8554 9.67433 12.0209 9.27462C12.1865 8.87491 12.2298 8.43507 12.1454 8.01074C12.061 7.58641 11.8527 7.19663 11.5467 6.89071C11.2408 6.58478 10.851 6.37644 10.4267 6.29203C10.0024 6.20763 9.56253 6.25095 9.16282 6.41651C8.76311 6.58208 8.42147 6.86246 8.1811 7.22219C7.94073 7.58192 7.81244 8.00485 7.81244 8.4375"
              /* stroke={pathname === "/tech-support" ? " black    " : "#A3AED0"} */
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        Технічна підтримка
      </Link>

      {/* <Link
        href="/settings"
        className={
          "flex flex-row items-center  py-1 px-3 bg-white rounded-lg hover:bg-accent " +
          (pathname === "/settings" ? " text-black    " : " text-gray-text")
        }
      >
        <div>
          <GearIcon className="h-4 w-4 mr-2" />{" "}
        </div>
        Settings
      </Link> */}
    </nav>
  );
};
