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
| yibei yang(Amber) /  yyan0553 | Audio mechanic |
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
### Time-Based Technical Implementation

The mechanic uses:

- `millis()` to track elapsed time.
- `PHASE_DURATION` and `CYCLE_DURATION` to create a 40-second loop.
- `getPhase()` to calculate the current phase and progress.
- `runTimedEvents()` to trigger repeated events during each phase.
- `handlePhaseStart()` to trigger one-off visual events when a new phase begins.
- Timed pulse, flash, and particle burst systems.
- `phaseLayerAlpha()` to control opacity for different visual layers in different phases.
- `drawPhaseMeter()` to display the current time phase at the bottom of the screen.



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

This mechanic introduces real-time user interaction through mouse events, allowing the audience to actively influence the visual system. Rather than passively observing the animation, users can trigger energetic visual responses through clicking and hovering.

Mouse clicks generate a burst of activity at the cursor location. Each click creates a glowing halo pulse surrounded by expanding particles and radiating light rays. Nearby network nodes react to the event by increasing their energy levels, while temporary connection lines form between the click position and surrounding nodes. These effects gradually fade over time, creating a sense of energy propagation throughout the system.

Hover interaction provides a more subtle but continuous form of feedback. As the cursor moves across the canvas, nearby nodes become brighter and slightly larger based on their distance from the mouse. This distance-mapped interaction creates the impression of an invisible force field moving through the network, making the visual environment feel responsive and alive.

The mechanic employs event-driven programming, timers, particle systems, distance mapping, and procedural animation techniques explored throughout the course. Together, the click and hover interactions transform the artwork from a passive visual display into an interactive experience where users can directly influence the behaviour and appearance of the generative system in real time.

---


# Part3: How the Mechanics Come Together

All four mechanics will share one canvas as layered systems. The Perlin noise mechanic creates a flowing background field, the time-based mechanic changes colour phases and triggers events, the audio mechanic makes circles and particles pulse with sound, and the user input mechanic lets the audience disturb or reshape the composition. They influence each other through shared colours, transparency, and repeated geometric forms. Visually, the project is held together by the *CUDA*-inspired style: overlapping circles, rectangles, lines, warm/cool contrast, and dense abstract movement.

---

# Part 4: p5.js Techniques

## 1. Modular Code Structure

```text
project-folder/
├── index.html
├── style.css
├── sketch.js
├── time-mechanic.js
├── audio-mechanic.js
├── perlin-mechanic.js
├── input-mechanic.js
├── assets/
└── libraries/
    ├── p5.min.js
    └── p5.sound.min.js
```





\\\\
For the current time-based prototype:

- `sketch.js` builds and draws the visual system, including background washes, circles, shards, bars, rays, nodes, glow, and grain texture.
- `time-mechanic.js` controls the timing system, phase transitions, pulses, flashes, particle bursts, opacity changes, and phase meter.

## 2. `setup()` and `draw()`

The project uses the standard p5.js structure. `setup()` creates the full-window canvas, sets colour and angle modes, and builds the base visual scene. `draw()` runs continuously and redraws the artwork according to the current time phase.

## 3. `millis()` Timing

The time-based mechanic uses `millis()` to measure elapsed time and calculate the current phase. This allows the artwork to change automatically without user input.

## 4. Arrays and Loops

Arrays store many visual elements, including washes, circles, shards, bars, rays, nodes, pulses, flashes, and particles. Loops are used to update and draw these elements efficiently.

## 5. Seeded Randomness

`randomSeed()` and `noiseSeed()` are used to make the composition feel generative while keeping the overall structure stable. This helps the artwork look designed rather than completely uncontrolled.

## 6. Blend Modes and Transparency

The project uses blend modes such as `BLEND`, `SCREEN`, `ADD`, and `OVERLAY`, together with transparent colours, to create a luminous layered effect inspired by *CUDA*.

## 7. Responsive Canvas

The canvas uses `windowWidth`, `windowHeight`, and `windowResized()` so the artwork scales correctly when the browser window changes size. The helper function `unit()` uses the smaller side of the screen to keep proportions consistent.
\\\\

---

# Part 5: Interaction Instructions
Open `index.html` in a browser.
For the time-based version:
1. **0–10 seconds:** Warm build-up begins with expanding warm circular forms.
2. **10–20 seconds:** Cool drift shifts the atmosphere toward blue, cyan, and green.
3. **20–30 seconds:** Energy burst triggers faster motion, bright rays, flashes, and particles.
4. **30–40 seconds:** Dark reset slows movement and fades the canvas.
5. The cycle repeats every 40 seconds.

## User Input Interaction
Move the mouse across the canvas to activate nearby nodes.
Hovering near nodes causes them to brighten and increase in visual intensity.
Click anywhere on the canvas to generate a glowing halo pulse.
Each click also creates particle bursts, radiating rays, and temporary connection lines between nearby nodes.
Repeated clicks can create overlapping energy fields and complex visual interactions.

# Part 6: AI Acknowledgement
Optimised code comments and drafted a README document. This helped clarify the purpose of the functions, explained how p5.js’s timing logic works, and improved the structure of the project documentation.


---

# Part 7: External References

- Gamboa Naon, M. (n.d.). *CUDA*. Behance. https://www.behance.net/gallery/66472289/CUDA
- p5.js Contributors. (n.d.). *p5.js reference*. https://p5js.org/reference/
- p5.js Contributors. (n.d.). *p5.sound library*. https://p5js.org/reference/#/libraries/p5.sound

The visual direction is inspired by *CUDA*, especially its layered translucent geometry, intense colour contrast, and generative abstract composition.