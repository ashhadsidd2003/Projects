STM32 Graphics Demo (Paddle Game)

This project is a simple graphics demo/game built on the STM32F031 microcontroller with an LCD display.This was a University Group Project given to us.

Features
- Paddle can move using buttons (GPIO inputs).  
- Ball/object moves on screen with basic animation.  
- Collision detection shows "GLUG!" when the ball hits the paddle.  
- Uses SysTick timer for delays and smooth movement.  

Code
- main.c: game logic, button input, collision check.  
- display.h / display.c: LCD functions (drawing images, text).  
- Sprite data (`deco1`, `deco2`, `deco3`, `dg1`) used for graphics.  

Hardware
- STM32F031 board  
- LCD display  
- Buttons connected to GPIO (PA8, PA11, PB4, PB5)  

Concepts
- GPIO input with pull-ups  
- SysTick timer interrupts  
- Basic graphics and collision detection on microcontroller
