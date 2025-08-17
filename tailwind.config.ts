import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					dark: 'hsl(var(--primary-dark))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 30px hsl(var(--primary) / 0.6)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'gradient-shift': {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				},
				'pulse-glow': {
					'0%': {
						boxShadow: '0 0 5px hsl(var(--primary) / 0.3)'
					},
					'100%': {
						boxShadow: '0 0 20px hsl(var(--primary) / 0.8)'
					}
				},
				'wiggle': {
					'0%, 100%': {
						transform: 'rotate(-3deg)'
					},
					'50%': {
						transform: 'rotate(3deg)'
					}
				},
				'elastic-in': {
					'0%': {
						transform: 'scale(0)'
					},
					'55%': {
						transform: 'scale(1.2)'
					},
					'75%': {
						transform: 'scale(0.9)'
					},
					'100%': {
						transform: 'scale(1)'
					}
				},
				'rubber-band': {
					'0%': {
						transform: 'scale3d(1, 1, 1)'
					},
					'30%': {
						transform: 'scale3d(1.25, 0.75, 1)'
					},
					'40%': {
						transform: 'scale3d(0.75, 1.25, 1)'
					},
					'50%': {
						transform: 'scale3d(1.15, 0.85, 1)'
					},
					'65%': {
						transform: 'scale3d(0.95, 1.05, 1)'
					},
					'75%': {
						transform: 'scale3d(1.05, 0.95, 1)'
					},
					'100%': {
						transform: 'scale3d(1, 1, 1)'
					}
				},
				'swing': {
					'20%': {
						transform: 'rotate3d(0, 0, 1, 15deg)'
					},
					'40%': {
						transform: 'rotate3d(0, 0, 1, -10deg)'
					},
					'60%': {
						transform: 'rotate3d(0, 0, 1, 5deg)'
					},
					'80%': {
						transform: 'rotate3d(0, 0, 1, -5deg)'
					},
					'100%': {
						transform: 'rotate3d(0, 0, 1, 0deg)'
					}
				},
				'jello': {
					'11.1%': {
						transform: 'skewX(-12.5deg) skewY(-12.5deg)'
					},
					'22.2%': {
						transform: 'skewX(6.25deg) skewY(6.25deg)'
					},
					'33.3%': {
						transform: 'skewX(-3.125deg) skewY(-3.125deg)'
					},
					'44.4%': {
						transform: 'skewX(1.5625deg) skewY(1.5625deg)'
					},
					'55.5%': {
						transform: 'skewX(-0.78125deg) skewY(-0.78125deg)'
					},
					'66.6%': {
						transform: 'skewX(0.390625deg) skewY(0.390625deg)'
					},
					'77.7%': {
						transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)'
					},
					'88.8%': {
						transform: 'skewX(0.09765625deg) skewY(0.09765625deg)'
					},
					'100%': {
						transform: 'skewX(0deg) skewY(0deg)'
					}
				},
				'heartbeat': {
					'0%': {
						transform: 'scale(1)'
					},
					'14%': {
						transform: 'scale(1.3)'
					},
					'28%': {
						transform: 'scale(1)'
					},
					'42%': {
						transform: 'scale(1.3)'
					},
					'70%': {
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
				'bounce-slow': 'bounce 3s infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'elastic-in': 'elastic-in 0.6s ease-out',
				'rubber-band': 'rubber-band 1s ease-out',
				'swing': 'swing 1s ease-out',
				'jello': 'jello 0.9s ease-out',
				'heartbeat': 'heartbeat 1.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
