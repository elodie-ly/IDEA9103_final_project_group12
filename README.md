# IDEA9301_final-project
group project
# Part1: Proiect Direction
Our team has chosen to **reinterpret an existing artwork**.

---

## Inspiration Source: *CUDA*

**Artwork:** *CUDA*  
**Artist:** Manolo Gamboa Naon  
**Source:** Behance  
**Link:** https://www.behance.net/gallery/66472289/CUDA
**picture:** 
![1_CUDA_Manolo Gamboa Naon](assets/1_CUDA_Manolo%20Gamboa%20Naon.png)
![2_CUDA_Manolo Gamboa Naon](assets/2_CUDA_Manolo%20Gamboa%20Naon.png)
![3_CUDA_Manolo Gamboa Naon](assets/3_CUDA_Manolo%20Gamboa%20Naon.png)
![4_CUDA_Manolo Gamboa Naon](assets/4_CUDA_Manolo%20Gamboa%20Naon.png)


---

## Vision Statement

Our team will reinterpret Manolo Gamboa Naon’s *CUDA*, a colourful generative artwork created with Processing. We are inspired by its layered circles, transparent shapes, geometric fragments, and strong contrast between warm and cool colours. We will modify the original artwork into an interactive p5.js piece where shapes do not stay still, but move, pulse, rotate, and respond to sound, time, randomness, and user input. Based on the *CUDA* images we saw on Behance, our version will keep the dense abstract composition and rich colour palette, but transform it into a living visual system. Circles, rectangles, lines, and translucent layers will share the canvas like a digital atmosphere. The work will explore how simple shapes can become complex, emotional, and energetic when they are controlled by code.

---


# Part2: Team Members and Mechanics

| Team Member | Mechanic |
|---|---|
| yibei yang(Amber) /  | Audio mechanic |
| yunyi liu(Elodie) / yliu0027 | Time-based mechanic |
| hanwen cui /hcui0590   | Perlin noise and randomness mechanic |
| xinyue zhang /xzha0936   | User input mechanic |

---



## Mechanic 1: Audio mechanic

**Owner:** Yibei Yang / yyan0553
**Mechanic:** Use audio level and frequency data to drive the mechanic.

The audio mechanic will use music frequency data to influence the behaviour of the generative abstract ecosystem. Different sound frequencies and volume levels will affect particle movement, shape scaling, transparency, colour intensity, and animation speed in real time.

For example, low-frequency sounds may cause larger circular forms to slowly pulse and expand, while high-frequency sounds may generate faster movement, flickering particles, or sudden bursts of colour. The system will visually react to sound energy, creating a strong connection between audio and motion.

This mechanic supports the project vision by transforming the artwork into a dynamic audiovisual environment rather than a static composition. The constantly changing sound input will make the ecosystem feel immersive, organic, and unpredictable.






---
## Mechanic 2: Time-Based Mechanic

**Owner:** yunyi liu(Elodie) / yliu0027
**Mechanic:** Employ timers and events to drive the mechanic.

The time-based mechanic will act as the main visual director of our CUDA-inspired interactive artwork. Instead of simply changing colours, this mechanic will organise the whole canvas into a repeating sequence of visual phases and timed events. The artwork will move through four main phases: warm build-up, cool drift, energy burst, and dark reset. Each phase will last for a set amount of time and will change how the shapes behave. For example, during the warm build-up phase, orange and red circles will slowly expand and overlap. In the cool drift phase, blue and green rectangles will move more softly across the screen. During the energy burst phase, the canvas will generate faster rotating circles, bright lines, and sudden particle explosions. In the dark reset phase, the movement slows down and the shapes fade, preparing the canvas for the next cycle.

### Time-Based Mechanic Diagram

```FULL TIME-BASED VISUAL FLOW

┌──────────────────────────────┐
│  Phase 1: Warm Build-up      │
│  0–10 sec                    │
│  ○  ◯   ◎    ○             │
│  red / orange / yellow       │
│  slow expansion              │
└───────────────┬──────────────┘
                │
                v
┌──────────────────────────────┐
│  Phase 2: Cool Drift         │
│  10–20 sec                   │
│  ▬     ▭      ○             │
│  blue / cyan / green         │
│  floating rectangles         │
└───────────────┬──────────────┘
                │
                v
┌────────────────────────────────┐
│  Phase 3: Energy Burst         │
│  20–30 sec                     │
│  ✦  ◎  ✦  ○  ✦               │
│  yellow / white / red          │
│  fast rotation + particle burst│
└───────────────┬────────────────┘
                │
                v
┌──────────────────────────────┐
│  Phase 4: Dark Reset         │
│  30–40 sec                   │
│  .    ○      .               │
│  dark blue / purple / black  │
│  fade out + slow movement    │
└───────────────┬──────────────┘
                │
                v
             Repeat

```
---


## Mechanic 3: Perlin noise and randomness mechanic
**Owner:** Hanwen Cui / hcui0590
**Mechanic:** Use Perlin noise and randomness to drive the mechanic.

My mechanic will use Perlin noise and random values to create the flowing and unpredictable parts of our CUDA-inspired artwork. The main role of this mechanic is to make the composition feel alive instead of static. Perlin noise will control the slow movement of circles, lines, triangles, and translucent geometric fragments, so they drift smoothly across the canvas rather than moving in a stiff or mechanical way. Random values or a random seed will be used to generate different shape sizes, positions, rotations, colours, and transparency levels.

The user does not directly control this mechanic, but they will experience it through the changing visual atmosphere. Each time the artwork runs, the layout can feel slightly different, while still keeping the same overall CUDA-inspired style. This connects to our project vision because Manolo Gamboa Naon’s work uses many overlapping shapes, rich colours, and a feeling of controlled chaos. My mechanic will help recreate that dense abstract feeling in p5.js, while also making it move like a living generative system.

---

## Mechanic 4:  User input mechanic

**Owner:** Xinyue Zhang / xzha0936

**Mechanic:** Employ timers and events to drive the mechanic.

The mouse and keyboard controls will make the artwork feel more interactive and alive. Instead of the visuals running on their own all the time, the audience can change what happens on the screen through simple actions. Moving the mouse will affect how the shapes and particles move, making them follow, avoid, or react to the cursor. Clicking the mouse can create quick energy explosions, bright flashes, or spinning effects across the canvas.
The keyboard will let users control different visual modes and effects. For example, pressing certain keys can switch between the warm build-up, cool drift, energy burst, and dark reset phases. Other keys can speed up movement, increase the number of particles, pause the animation, or trigger extra visual effects.
By adding mouse and keyboard interaction, the artwork becomes more playful and immersive because the audience is able to influence the visuals in real time instead of only watching a looping animation.

---


# Part3: How the Mechanics Come Together

All four mechanics will share one canvas as layered systems. The Perlin noise mechanic creates a flowing background field, the time-based mechanic changes colour phases and triggers events, the audio mechanic makes circles and particles pulse with sound, and the user input mechanic lets the audience disturb or reshape the composition. They influence each other through shared colours, transparency, and repeated geometric forms. Visually, the project is held together by the *CUDA*-inspired style: overlapping circles, rectangles, lines, warm/cool contrast, and dense abstract movement.

---
