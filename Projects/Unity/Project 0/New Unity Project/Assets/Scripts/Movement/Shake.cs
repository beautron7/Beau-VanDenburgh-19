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

	void Update () {
        time_elapsed += Time.deltaTime;
        time_elapsed = time_elapsed % (shake_duration * 2);

        if (direction == 0)
        {
            transform.position = new Vector3(initialtransform.x + (shake_duration - time_elapsed) / shake_duration * shake_distance, initialtransform.y, initialtransform.z);
        } else if (direction == 1)
        {
            transform.position = new Vector3(initialtransform.x, initialtransform.y + (time_elapsed - shake_duration) / shake_duration * shake_distance, initialtransform.z);
        } else
        {
            transform.position = new Vector3(initialtransform.x, initialtransform.y, initialtransform.z + (time_elapsed - shake_duration) / shake_duration * shake_distance);
        }
	}
}
