using UnityEngine;
using System.Collections;

public class Shake : MonoBehaviour {
    public int direction;
    public float shake_distance;
    public float shake_duration;

    private Vector3 initialtransform;
    private float time_elapsed;
    // Use this for initialization
    void Start() {
        initialtransform = transform.position;
    }

    float TriangleWave(float dur, float dist, float time)
    {
        return Mathf.Abs(
            (time + dur / 2) % (2 * dur) / dur * dist - dist
        ) - dist / 2;
    }

	void Update () {
        time_elapsed += Time.deltaTime;

        if (direction == 0)
        {
            transform.position = new Vector3(initialtransform.x + TriangleWave(shake_duration,shake_distance,time_elapsed), initialtransform.y, initialtransform.z);
        } else if (direction == 1)
        {
            transform.position = new Vector3(initialtransform.x, initialtransform.y + TriangleWave(shake_duration, shake_distance, time_elapsed), initialtransform.z);
        } else
        {
            transform.position = new Vector3(initialtransform.x, initialtransform.y, initialtransform.z + TriangleWave(shake_duration, shake_distance, time_elapsed));
        }
    }
}
