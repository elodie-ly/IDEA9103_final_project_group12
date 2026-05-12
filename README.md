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
| hanwen cui /   | Perlin noise and randomness mechanic |
| xinyue zhang /   | User input mechanic |

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

The time-based mechanic will control the main visual rhythm of the artwork. Inspired by the changing density and layered composition of *CUDA*, this mechanic will use timers to create different visual phases. For example, every 8–10 seconds, the canvas can shift between a warm phase, a cool phase, a high-energy phase, and a calm phase. In each phase, the background colour, transparency, shape speed, and rotation amount will change. Timed events can also trigger new circles, rectangles, or line bursts to appear automatically. The user does not need to do anything for this mechanic to work; the artwork will continuously evolve by itself. This connects to our vision because it turns the original static image into a living generative system. The timed changes help the canvas feel like an active digital artwork rather than a still poster.

### Time-Based Mechanic Diagram

```text
0–10 sec: warm orange/red phase
10–20 sec: cool blue/green phase
20–30 sec: bright yellow energy burst
30–40 sec: darker layered calm phase
then repeat
```

### p5.js Code Idea

```javascript
if (frameCount % 600 === 0) {
  phase = (phase + 1) % 4;
}
```

---


## Mechanic 3: Time-Based Mechanic









---

## Mechanic 4: Time-Based Mechanic








---


# Part3: How the Mechanics Come Together

All four mechanics will share one canvas as layered systems. The Perlin noise mechanic creates a flowing background field, the time-based mechanic changes colour phases and triggers events, the audio mechanic makes circles and particles pulse with sound, and the user input mechanic lets the audience disturb or reshape the composition. They influence each other through shared colours, transparency, and repeated geometric forms. Visually, the project is held together by the *CUDA*-inspired style: overlapping circles, rectangles, lines, warm/cool contrast, and dense abstract movement.

---
