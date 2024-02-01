import { Add, ArrowCircleLeft, ArrowCircleLeftOutlined, SettingsOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostModal from './postModal';
import { useDisclosure } from '@chakra-ui/react';
import EditProfileModal from '../users/editProfileModal';
import { userContext } from '../../contexts/userContext';

function Nav({ id }) {
    const navi = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const settings = useDisclosure()
    const [userDetails] = useContext(userContext)

    return (
        <div>
            <div className=" grid-nav bg-success py-2">
                <div className='text-white ms-1' onClick={() => navi(-1)}>
                    <ArrowCircleLeftOutlined />
                </div>
                <div className='text-white straight flex shi' style={{ width: '90px', fontSize: '15px', flexDirection: 'column', letterSpacing: '1.5px' }}>
                    INDEED
                    {/* OSHOFREE */}
                    <div style={{ fontSize: '6px' }}>All4one</div>
                    {/* <img src={Logo2} alt="OSHOFREE" /> */}
                    {/* <div className='tiny' >all 4 one</div> */}
                    {/* <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAboAAAByCAMAAAAS5eTaAAAA2FBMVEX///8hZPIcYvIUX/IWYevk6vcQXvIaYfMAW/A4dPL0+P4AWvH///6DoOoAW+/8/f+kuOx1mu/u8/0naO/3+v+otMna4/ZQf+mJj5Lq8Pw1b+swbe5VhPQ+d/GYsu/H1fZMfOu9zveswfOSre8ybe3T3vjh6fpfiexBdui/zfDN2vlahvCBofGOq/PT2+uSmZ9njuvCz+jK0NuMl6iDjJmqvvFji+qYpr6Pnru9xteYnaCwwOGKlarZ3+y1wtuVobakrb20vcyhtuCcrs3BxckAVPF3muynu/jRH3cVAAAWgklEQVR4nO1de2OiyLKXxtAMRFFhTYSIoqLEx4yzic6Zu7szZ+/ek3z/b3RpRIWu6gbMc3KsP/ZhpGz611VdVV1VXauVps58NF5fxbRg/5itbnvlnz3Tm5Ex92eeaWqUUBITjf+tmWToh289sDPJKVxOdJ0ShSNC9eZiZLz16M4kpMGMaAC2PVG9P7LeeoRnQilYNKkItx14zeHg8q1HeSZAg4WZAY5QVdNUGv9T11SSAa991prvjLproh4B0lR70V42xmPfb42X6091XUv3P6INu2891jNlaeTtRYtour1uzTvZvzq9YHWjpEJJvcFbjfJMgIz23jihpr0c4CrxYhPpCXjUPmP3Xih0tb0NGUkdgNthInm0fsbufdDKJHvgbou+OxgyySP2eb97B+Rszd0ep0dBme8P3Fi5qjdnB++F6fO3f8X03RF/w1joCXDqpLS7Pa5TYpaC+Uyn0ue76y9fvvzPl+s7IXjGTNsh164QYA6vVC06i90L0h/3d997MWbO97vrPy/QrxjrBDnVHlXi7Ph287zbvRz9uP5nL0nO39ffMClxEuSIflUZh2nQKf7SmU6jv65/GtOvjP6KUfvt+gf8irNz55pLyV54plcn5+f9XzFgd3/+eX/9b6tmfbsHKtNqxzJHCK2mLN+OjNV6sVi3Hz/WQnM2D4to0X48Hod+vv7OZO17Zxre3X9m//83/1Cb2ZaE/CrudeCycDjV9Gj+1kN5RhrEJh9lUf6jufEjFroYut/j//zf66/xP+++cQ+NmSdOfpnAiH8416DNj+OZBCSNHRNClulnP5iCjHe4XvfrXaIrv/2Zf2jOniG/TDgyrB9Pngj5KDaS8el4zkbMze7DP+47DLrr+/vrb4mh+c9d7iGnnwS0RJEvpxdO39XB3Pp4JKUo2sNbD+eZaKVnD7Lt3S6eQvfH79+uPycf/OtL7qGGzrQlqnms+dhtkrrtTdqD92ISzNVc3kVz+tYDehbqTXJvpe62ux/MNmF7nfXzjkmd8SW31w2aTEQx29IaDYnOUsGIQjQtar0P8JZa9h0VszBO/kvQSM+9ldZOPr1gTnhipny+/xk7dt9T4duR4dIYGB/h1lvTbD4Y1YfvYoG3c9CRDwLdOL8g6WL38T+xXbmzMH+L/YLO3X02nPIQP6MvEWahx2eEae47sGSsWT7f6YNEvznoyGT3ce/uzrj4wUwx4wcD8XvmkdtYG6oLJDTW9WBKGLXffp6cm/y4UIXx61FDzb0Vqaeff76++z39z4tv1/9knnAiqlAPUYSGm+e15/jmic8OJ3Va461H9Cwkgq72930MXq938df3++vfstZGq0kIxUQpv6McJ2rx8m8hp/826Gq932Lw7mPP7mfWRElsFPTdA1His/rWKtP4oNBxe10987fe1/+LqZvf1Ta6Ql3M357BWoMd0eFLvkAJ+i+EDiOjTxUTsxqnwmqDN7foPih0y4rQbTSS+n4c+fhOx0hdv8DAK9AZOkYGMy/RRJSZuFaEXr3EyMuTsfiY0AnNFJRGlGgr7A/OlQS6N7YxPyh0D5Wgs4aU1FGhM4bive4M3YtQNejmsWMwRv/ifJJA994UJhbE+/WoXQm6hkZsQcrl8P3udZ2rM3SGRwRCV6ttz9C9MlWCLjCJjWfTCsNgCXSzFxh4BfqY0FnrKtC1Vdy8ZDTIH/zlpkr40OtQZ/gxocu/lRS6Xp0owqPTJF0FJclDr0Nn6GojU5aR44vEDpmpgmoR63nzIk6D7jLpNmFZl0/rOuHEDKyXyEGzthWgW2tNydlbZyJwD/I26XQ1++T1ZyMEHSfcLBeLmz6jdWvQKV8OZAw2jXVC21m7EXBSXhW6TthaDvt913Unnue5w7YfTKuXJhnzVmN903cntu1NJv1ZexxcVONihaPxcjG8uZm1l6uVP89PWRXoHE8dyn47MFHkzJxNurE1SghVQQ2sESz7RGe5vHT3Bd1etErVfhlB26trmroj1vajPhxns9E6UX5RqRLonPBx7VLWcuJAMUfVHo7DCvNuTTfrSdJ/5MBkN65V6Sw543bZj99qNyHxs5redJdB5siGT9uQQRc2hZ7Bjnwdyh0xc8Hq5R5eQpVsRlnvsR9PF/cs1e1xIXhhY6JrJP/DhGr6J/+gpQB0QrXfeYzquopoD8ax3xJZ1zyXzQ3BuBDWl6Tvl9GePb+v8W+lEE31loeyqirQbUyloByrDbFr5k4NBpkvEPug16xNX9ChSvPk4F00bGymGftjY6teSeg6voc0ODvOu+6tSqiBztjThFwUQjTbL0ov7vmuihp98dP1cfq0tSgPXdssikVafjM/kWrzIadmouyvHc6CBlFT/KqaKz7tM1a22JtkqYS7g8Vy0Bm+C+QeDmZUYLQ4rYlgLR256O6jDLxL3xW3WovHkFbtOxWgc/VH+bBjCmfHFUdo8yY/7WEz91upez+S9xajRIRdt49o6NyjepL71esXQ3cZFDFLOQ6lWVJBX7wKM1w0SdMEa1v0VmpS0lgBuk6zXsY/u93WTT3eVU1TXQTczs4dDu5qbnwsjyw3JgF24aToyXiBM4ukDHRLvUDiDg8rkopCvywXSkQJhc5MokjSt9L6U5iiKIFu/p+S8axe4C8b/ugWboz8aTWLsvjifeEwKHS2wkmZadJmRgnojK04FgRGQ0XBIadduJaOXAQmn1GMHHuDSbcKdKP/FOvLAuJjiQ2WF1FCwRACtVS3FHLxj0S9jlsAXa/UfB1GI8CuFxXtcjkuWgPxNnqLUiMh1A5r5aFbaU+OZ3HQqW2W1FlqpC7Pqixy8a9EgwKpM8rN13E4qMR0ripyMeGJb+emLA9qB+Whmw2rIgWIg45uWypThyVI3+Q5Td2yyMU/0+eOgdV8XpQ1K68td0SacKeyJEcnAgJh+SojITb3VhLo3Kdn6nPQkUm9rIahbs6RNfrldxWmb/P/n4fuco1FgYiq6aaua6qK7sX8UoqVEqo/WDPXmJqo20F0bkpXVdYQ/3MS6OpPb1PDpx7xMZCE8IHmddQjHnPbdb/VWThNtiby0I0RXrH3/bAJ5oNg469mBAuM8Lmlj02Mi71dbYLBIBitZgqy2Iies7/m/Bo7MFJ1toqodL1KoOufBlc2/iDOGovn3IuGV4vF1dBGDRf6KSN2HXyjo81+w2dTxWZKYv7koAshMKTZfzz+mjVvI+AROxeMDOGsxib85hg5s7pLJO5D7FxQEoWGaHb7MQjnweP4QRaBkEB3UsHOvJ01MITQxZ7uZtoxHMtyjB4eTNAyKddjTLEQfXGMzjrhQ124TnLQXYH5IvUxF2bsrqGXbLay34CzTppLg+cCscsqkwARXBbAaR1HM23gC3s37MroiMkJZkTzMh8IoCPa8DZrKHdWiO2SMQunNsJD9YJ8jCrcirRmFroArAK0InAMdjIyySATglnHKu2tRzhs76CVLOysmvIBz+nKFizJ54OuM1/12ZnHJPMZDh3RV/xJSAuqjkzRyQqqDaJFYCu2fIGflYHOivghCRocjwGvbIElSP0W9CXZAJk5WplwEbHBwAY9AwF2T4Su1+12w/Dr19vVwtOSYRZDh1natTXE7nDQgJ3pahF2lIKqoBx0I36+iCKooG7wvIh7WHBA6EhTEC0DlRlHsUMmh6Cm4QC3y58IXUtX1cQcPhjDhdChyNW6NrC21P1sjEwwdNrHTzBHqCWagQ4oKXQ0jCww+KN5CIRORytqkq/ya1JL98wQDpWouFEfoH7IU6EDaqUQOkG6GHRwDzs65ELqouPLFYbdEbpb/ldoJDzF7vKLiUbpX0LAxRUep0Iu6aqDPh0hok4TaD7Ck6EDDAssTFE9whxCl2JsQC1oioP5Q8TgPkIHZUByLACCyyTdiPiESKJW4aLuTHcXWp/iPAwshev5oSuQOlWwtRhgQ1PTkB9cclSSMgNtvwx0Pd5UzexfkOZg0nd6wOG4ENqX5DB0+VnfLckpHKctjhkbNhIleGWpozPRrMPVmUIHLRhdVjWLGDwH6AJev0uTfZ0+r+u2yedAX6rSSiLAJZkCuCtL65EQsXtl6ESnqDXkBHY/IUAcqbQJOBItOUD3wE06odK4w5L/+iSxDsfcSIlIk6QvxnNJpAuuMOltEB0PRmZeFzraFyZpDMBa3vnkPbDeCvIuYHuCPXTAqSPyYN8tjxFJZnfBc/GkOV9z7gV2nUzAVldQxT0GtsArQyfZiYEaShXILa9ZSF2eYwdd3T10Uz5oowpt+oR6/A6TZGiAT9WtlIvBu2XMtweGJ5EZTDFdIPE76QNFVBk68UHSVKAwwaEBLbirpAM82D1CAf8TekEja140kuEDLmrB6Ri/2bE1yRfbEKVgQV7yXF4bOkk3nAsgEjvoQBSsqI7IugG/mkLXENjpQuIVrMp+einyGUTElXkk0AHVQG/kTPiuKS8BXXb7gGaK+C17vLCk0G2BqBT1/gMvuYeOD4KQopQ3fldLvAMeCSIx6tHxsLX3WHVB1kZgxbwqdFi60J46vM+VQgdkiBSlk4M4ZQodn1IV2xfhhYw6PEoqM5B425DYcymXHoBujOmSogXZ5bfYp0IHY1RS6CTLXAAdDPXL7bmY5vyYUugMpHNBUtiREis+0VLSE+K/rbE0B14UY0VPpMTvBAw64HcU5iQAL/P5pS7K/BlCJ5YYg/dcdtCBJh9E7F+kdAFU7w46zDcC0yylxKyB/Q/kyKHHrfyGWXzHH9jCX1nqRO0gaohMpNCBEUdF0AETM4UO+AaVKYFOWM1bmotfs94ldFKps8XKTgBdjx8xHZ4KXfep0BFmZVmiitDSFNtZFh/2ewPoKipMyT718tCFT4Uu6UwBLOHKXIZODB1Y1GfoamLo5k+EjiRuIIiDVOMRb3WPsKT/F4eOt6B20HV4g+7NoCN6ElQFRlBVLlsH9kD5BaD7VBk6vt/XUxTmE+SFENPeJGd7wBKuxEafjBkXvqT/fUA3zPz5GaBz+IPtYucAxmVSMwVJKShB7CY1U3P91Di2oHdIwRMIsRwe0/VTxxYEdt4BdPRkqYtQ6EAgTMZjR1NBzQFwDojS/1RE/X60aPuZ2kEYI6i7XubrjKIoGiZ0dbVYLGYxbbfr9dI/5p6cYGHy/uTzQzfM/BlAJ8kEEEEHX7KoNL8rCD8DuSZeASeMYA/XSYXrovfEB8KKoynAjHv/0PEhI0UtKvuDpzKC8LNin3JzW/VtCqENr7wLL0jsetwTLwsdkPEToHvkX7KwnzsI7e6h4y1yBW+wW0DArj+lJAo0xytshgUW5PuHLuATaIteUnJexw+n6LwOJXhed8INVMDaLTpAhgvylaFD0813JIIOZAmzaISMQALCAboNyMI85UKGWz4NTzuh5t6BaZhy2b0EUe/XhY7KoOOPCPYZYbypX6SgApCAs4curAv+UImqZrjgBI6ONFA3myMD5pm/LnTDE6CDCS7yzmVrUF2zn9sOb6TJcnGzZBnTzGkV3AbKWTtWZ9o5KAxQR0K30rFsQN7mLwAdzB6VGoZTGKg6iAVwNEpZGNaq7yn28NAWEti8Sqmrz/0rW/GG+45fIHdRfnkcUoz3/NBlW3bzaMiCWELoYEmMLhM7kJmSgY5PrNynokvJYSWuhFC9n3ol/KwTWdPGPVlbnTIuWsrFAfE0qd4dweLW15Y6CXRXAuhqMN9e4pVjh3LHmgPeN8LvCMvRsT2Klia5glQM2Xj2b7dvskO01MqC1ZVEogKQ+zlfWequTpA6REFJ0vNBApmSXc9rnlVhB7vp8WpMss9FA+URBbtvvGaGxx9u7uyRW1A1qArrMWo+UqX1jqDjzZEDdHzmNxu2KPe1hdW1HqEb8EntpCCKFWabC6hpwh2IY4uvFEi5eJklk/qlDlQmaluA3Rzttvqi0PGu2mnQYbWRTbyKcIT2JzxC5wDvSL5PBTmo6f67oAuEJpr0hAa55hL74gKoTBR9ibKZo+dMLwwdv9ctToIOKeokOoadoAOZrJZc4TsIZemRa9S614tzINtNSYXVKD+qQwUEbDhBdKwF3C2y0SmvLnWnQYe1qSAEtOU1GoIeI1nbDWZRNkXbXeeB01PHEgW4owqtXmfJbWqHtYKInWI2gPs0epkODlWlbnYSdIisMOwWueYrRjAU9TjMQhfChiiCGpYB35+aHCvGwbkS32j+QPOIB+iQ5z7FIFGjUXaOrMFadLb/jqADCf5H6OAWxYZOydVmurO0je44whtfJ5yyHhPSUI8soZXRWxI+aJKFGPEe9TY8jerAhjWZ6DkmdszzG4e7aXKmrSt+FJlvvq7CPBE6eOKxf8361WxxNRx+ssXAcdBdQMuOqHxr9Z7vAeWba1fUQ5o8qnYjD17vcQJiJtnikikfU01nSVOiWfxai6GNtwlMWb0f6HgfNQvdJd4JTdl398srFXmcAmnDEktU/SFMbzcxuqOth+jevD0zwNLLNHs573YcxscJg7YN7V2ydzASQmR39y1CVdC08OXDz1LotidCV5siLQxERG0uQZkLMT0i2MVzqtZttx8NI1tFLz9QuS47I7QzkqoqdTshhWJbL3Wzupm/wUZGRHG5D34R6Gq3pfssq5OAv+eAiw4KumsmFTsiDUVBsMs3UQNi/yHKh48xX5RurkvIpspNWsU0AhJPs4XVvNFI1+JTUkcOXW1UEjvVnfLJU+BcfVzmioP8yJF4SakO5HkuoGNEV9R3jyPW+K/aXa1FNAemdq46E5QWSu5UA+k6fDcSv1Tyshr1wBUqeov7qUuRBygi6mGh4XHFnFyK1L8GpXgk7QP50KldEiSceuB3cz2geOtX2huGHxmIMfsl3lJjJ4L8xUVIX6qWuPEpJKJG+FnaqAqXZFUhPJRiHtRjv88ZNQWdQ4oI9sAl2eHxESxpnL7F+d2wvUKxztR34Rou88dEgmYBsNvFE0eWohPieanbZRIi2gznMvCKWpJrk0TmucCEJm+0Ukh8vDfPz8qfWMvL7i/yXg5But0FRPqW1Ez30tucbsXr9GOfu9TuSZp9SfJRp6GU46J5wvu0wkjaeJ2Yi9348zdvEGm7rRLUyYcX+fS4fHfzgjS8Zf7LWHgqnImvciK6u5fTfKGCaHmG62bhJTVEs8fy09juVmiV5rhIDpeMpSrEP8Z8s4/35TpcEbf6xZZ5miuZgRPKzbcVZX5N2sCuxs78s2djeKPKyyAy8Ti6Nmkd53ieEXdo1h+/tlCl9ymp+ie/8PpBK5hRCRd2D97ELzhGj5ckCl6sGJbHR6fZxvOFmcTFFBydfqK3+RXaPbZ7V5WihNX5UR9qwoQfK4h0sMFS086Hso5tt6msWWUtHEdUcP2gqtfXQbnrOrvjqImvKEU1uYCygAaLJm/1srdq5+YsYxaZp2QQ8hT2TcoaTFCzjkzSdJbMDFHVRXH2VTgzNVblpKozyWK3btt201RJ4kMn1znUZyNeoEeKztpeUL1ftGC6rUU95pFes5pMmaqZTbs9qpLW3m3NbNVkl7Uqu4YbOy7eetQteeNyuHLZtaFpnRe76fVmw48gjJK5JprK+zsn0mDt2nZ/u8EXV7j2bDdql8sRD9uTuhe1C1PBu6OHoet58c8uHloDTOs7/tWkPtluyuwIl93b1nIRuRN2Q7IXzZY+f+lyGUq4zBiXiadMbmIuyL1wUpqOlsNkCMP1cnyLrRxntJ6wlEDpqvp/ajS/Y0b/3vgAAAAASUVORK5CYII=' alt="Indeed" className='logo' /> */}
                </div>

                {
                    userDetails._id == id ?
                        <div className="flex me-1" style={{ justifyContent: 'flex-end' }}>
                            <button className="btn btn-outline-light btn-sm me-1"
                                onClick={() => onOpen()}
                            >
                                <Add fontSize='small' />

                            </button>
                            <button
                                onClick={() => settings.onOpen()}
                                className="btn btn-outline-light btn-sm ">
                                <SettingsOutlined fontSize='small' />
                            </button>
                        </div>:
                        <div>

                        </div>
                }

            </div>
            <PostModal onClose={onClose} isOpen={isOpen} />
            <EditProfileModal onClose={settings.onClose} isOpen={settings.isOpen} />

        </div>
    );
}

export default Nav;