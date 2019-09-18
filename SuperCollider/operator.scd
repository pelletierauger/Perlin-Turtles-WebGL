(
SynthDef.new(\operator, {
    arg out = 0, freq = 440, pan = 0, lfoFreq = 1, 
    atk = 1, dec = 1, sustime = 1, rel = 2, sus = 0.7, pMod = 0.2, amp = 1,
    mod1 = 1, mod2 = 1, mod1Amp = 0, lfo2Freq = 10;
    var sig, env, lfo, lfo2, mod;
    // Safety measures, constraining values.
//     amp = min(max(amp, 0), 1.5);
//     freq = min(max(freq, 30), 1000);
    //     
    env = EnvGen.ar(Env.new([0.0, 1.0, sus, sus, 0.00001], [atk, dec, sustime, rel], [\linear, \linear, \linear, \exponential]), doneAction: 2);
    mod = SinOsc.ar(freq * 1) + (SinOsc.ar(freq * 8) * 0.01) + (SinOsc.ar(freq * 48) * 0.5) * mod1Amp * Line.kr(1.0, 0.0, 4);
    mod = mod * SinOsc.ar(3);
    sig = SinOsc.ar([freq, freq + 1] + mod) * 0.1;
    sig = sig + (SinOsc.ar([freq + 1, freq] + mod * 8) * 0.01) + (SinOsc.ar([freq + 1, freq] + mod * 4) * 0.01);
    sig = sig * env * amp;
    sig = LPF.ar(sig, SinOsc.ar(4).range(600, 2000));
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

(
Synth.new(\operator, [\freq, 220 * 2.midiratio, \atk, 1, \dec, 0.4, \sustime, 0.1, \rel, 12.5, \amp, 4, \mod1Amp, 50]);
Synth.new(\operator, [\freq, 220 * 7.midiratio, \atk, 1, \dec, 0.4, \sustime, 0.1, \rel, 12.5, \amp, 4, \mod1Amp, 50]);
Synth.new(\operator, [\freq, 220 * 4.midiratio, \atk, 1, \dec, 0.4, \sustime, 0.1, \rel, 12.5, \amp, 4, \mod1Amp, 50]);
Synth.new(\operator, [\freq, 220 * -1.midiratio, \atk, 1, \dec, 0.4, \sustime, 0.1, \rel, 12.5, \amp, 4, \mod1Amp, 50]);
)
(
Synth.new(\operator, [\freq, 440 * 2.midiratio, \atk, 1, \dec, 0.4, \sustime, 0.1, \rel, 12.5, \amp, 1, \mod1Amp, 1500]);
Synth.new(\operator, [\freq, 440 * 7.midiratio, \atk, 1, \dec, 0.4, \sustime, 0.1, \rel, 12.5, \amp, 1, \mod1Amp, 1500]);
Synth.new(\operator, [\freq, 440 * 4.midiratio, \atk, 1, \dec, 0.4, \sustime, 0.1, \rel, 12.5, \amp, 1, \mod1Amp, 1500]);
Synth.new(\operator, [\freq, 440 * -1.midiratio, \atk, 1, \dec, 0.4, \sustime, 0.1, \rel, 12.5, \amp, 1, \mod1Amp, 1500]);
)
Synth.new(\operator, [\freq, 220 * -7.midiratio, \atk, 0.001, \dec, 0.001, \sustime, 0.00, \rel, 2, \amp, 12, \mod1Amp, 4800]);
